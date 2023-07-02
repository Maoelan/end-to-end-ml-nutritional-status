from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from flask import jsonify
from models import Anak, Gizi

def train_kmeans():
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

    kmeans = KMeans(n_clusters=n_clusters, init='random', random_state=random_state)
    kmeans.fit(scaled_data)

    iterations = []
    initial_centroids = scaler.inverse_transform(kmeans.cluster_centers_)  
    initial_centroids = scaler.fit_transform(initial_centroids).tolist()  

    total_iterations = kmeans.n_iter_

    for i in range(total_iterations):
        iteration = {}
        current_kmeans = KMeans(n_clusters=n_clusters, init='random', random_state=random_state)
        current_kmeans.cluster_centers_ = kmeans.cluster_centers_
        current_kmeans.labels_ = kmeans.predict(scaled_data)

        for j in range(n_clusters):
            cluster_points = []
            for index, point in enumerate(scaled_data):
                if current_kmeans.labels_[index] == j:
                    cluster_points.append(point.tolist())
            iteration[f'cluster_{j+1}'] = cluster_points

        iterations.append(iteration)

        kmeans.fit(scaled_data)
    
    cluster_count = n_clusters
    centroid_changes = kmeans.inertia_

    cluster_labels = []
    for label in kmeans.labels_:
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
        'centroid_changes': centroid_changes,
        'cluster_labels': cluster_labels,
        'initial_centroids': initial_centroids,
        'total_iterations': total_iterations,
        'scaled_data': scaled_data
    }

    return response

if __name__ == '__main__':
    result = train_kmeans()
    print(result)