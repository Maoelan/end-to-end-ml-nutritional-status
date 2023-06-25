from sklearn_extra.cluster import KMedoids
from sklearn.preprocessing import MinMaxScaler
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
    kmedoids = KMedoids(n_clusters=n_clusters, init='random')
    kmedoids.fit(scaled_data)

    iterations = []
    initial_medoids = scaler.inverse_transform(kmedoids.cluster_centers_)  # Menggunakan scaler untuk mengembalikan medoid awal
    initial_medoids = scaler.fit_transform(initial_medoids).tolist()  # Melakukan MinMaxScaler pada medoid awal

    total_iterations = kmedoids.n_iter_

    previous_medoids = None
    for i in range(total_iterations):
        iteration = {}
        kmedoids.fit(scaled_data)

        for j in range(n_clusters):
            cluster_points = scaled_data[kmedoids.labels_ == j].tolist()
            iteration[f'cluster_{j+1}'] = cluster_points

        if previous_medoids is not None:
            medoid_changes = kmedoids.cluster_centers_ - previous_medoids
            iteration['medoid_changes'] = scaler.inverse_transform(medoid_changes).tolist()

        previous_medoids = kmedoids.cluster_centers_
        iterations.append(iteration)

    cluster_count = n_clusters
    medoid_changes = kmedoids.inertia_

    cluster_labels = kmedoids.labels_.tolist()

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