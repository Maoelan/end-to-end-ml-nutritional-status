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
    kmeans = KMeans(n_clusters=n_clusters, init='random')
    kmeans.fit(scaled_data)

    iterations = []
    initial_centroids = scaler.inverse_transform(kmeans.cluster_centers_)  # Menggunakan scaler untuk mengembalikan centroid awal
    initial_centroids = scaler.fit_transform(initial_centroids).tolist()  # Melakukan MinMaxScaler pada centroid awal

    total_iterations = kmeans.n_iter_

    previous_centroids = None
    for i in range(total_iterations):
        iteration = {}
        kmeans.fit(scaled_data)

        for j in range(n_clusters):
            cluster_points = scaled_data[kmeans.labels_ == j].tolist()
            iteration[f'cluster_{j+1}'] = cluster_points

        if previous_centroids is not None:
            centroid_changes = kmeans.cluster_centers_ - previous_centroids
            iteration['centroid_changes'] = scaler.inverse_transform(centroid_changes).tolist()

        previous_centroids = kmeans.cluster_centers_
        iterations.append(iteration)

    cluster_count = n_clusters
    centroid_changes = kmeans.inertia_

    cluster_labels = kmeans.labels_.tolist()

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