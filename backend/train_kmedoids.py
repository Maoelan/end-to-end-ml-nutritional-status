from sklearn_extra.cluster import KMedoids
from sklearn.preprocessing import MinMaxScaler
from scipy.spatial.distance import cdist
from flask import jsonify
from models import Anak, Gizi

def train_kmedoids():
    anak = Anak.query.all()
    gizi = Gizi.query.all()

    data = []
    for a, g in zip(anak, gizi):
        data.append([
            a.berat_lahir,
            a.tinggi_lahir,
            g.berat,
            g.tinggi
        ])

    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)

    n_clusters = 3
    random_state = 12

    kmedoids = KMedoids(n_clusters=n_clusters, init='random', random_state=random_state, metric='euclidean')
    kmedoids.fit(scaled_data)

    iterations = []
    initial_medoids = scaler.inverse_transform(kmedoids.cluster_centers_)  
    initial_medoids = scaler.fit_transform(initial_medoids).tolist()  

    total_iterations = kmedoids.n_iter_

    for i in range(total_iterations):
        iteration = {}
        current_kmedoids = KMedoids(n_clusters=n_clusters, init='random', random_state=random_state, metric='euclidean')
        current_kmedoids.medoid_indices_ = kmedoids.medoid_indices_
        current_kmedoids.labels_ = kmedoids.predict(scaled_data)

        medoid_changes = []
        for j in range(n_clusters):
            cluster_indices = [index for index, label in enumerate(current_kmedoids.labels_) if label == j]
            cluster_points = scaled_data[cluster_indices]
            distances = cdist(cluster_points, cluster_points, metric='cityblock')
            new_medoid_index = distances.sum(axis=1).argmin()
            medoid_change = abs(cluster_points[new_medoid_index] - scaled_data[current_kmedoids.medoid_indices_[j]])
            medoid_changes.append(medoid_change.tolist())

        iteration['medoid_changes'] = medoid_changes

        for j in range(n_clusters):
            cluster_points = []
            for index, point in enumerate(scaled_data):
                if current_kmedoids.labels_[index] == j:
                    cluster_points.append(point.tolist())
            iteration[f'cluster_{j+1}'] = cluster_points

        iterations.append(iteration)

        kmedoids.fit(scaled_data)
    
    cluster_count = n_clusters
    medoid_changes = kmedoids.inertia_

    cluster_labels = []
    for label in kmedoids.labels_:
        if label == 2:
            cluster_labels.append("GIZI LEBIH")
        elif label == 1:
            cluster_labels.append("GIZI BAIK")
        else:
            cluster_labels.append("GIZI KURANG")

    scaled_data = scaled_data.tolist()

    response = {
        'iterations': iterations,
        'cluster_count': cluster_count,
        'medoid_changes': medoid_changes,
        'cluster_labels': cluster_labels,
        'initial_medoids': initial_medoids,
        'total_iterations': total_iterations,
        'scaled_data': scaled_data
    }

    return response

if __name__ == '__main__':
    result = train_kmedoids()
    print(result)