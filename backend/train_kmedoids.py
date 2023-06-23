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
            g.usia_diukur,
            g.berat,
            g.tinggi
        ])

    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)

    n_clusters = 3
    kmedoids = KMedoids(n_clusters=n_clusters)
    kmedoids.fit(scaled_data)

    iterations = []
    for i, labels in enumerate(kmedoids.labels_):
        iteration = {}
        for j in range(n_clusters):
            cluster_points = scaled_data[labels == j].tolist()
            iteration[f'cluster_{j+1}'] = cluster_points
        iterations.append(iteration)

    cluster_count = n_clusters
    centroid_changes = kmedoids.inertia_

    response = {
        'iterations': iterations,
        'cluster_count': cluster_count,
        'centroid_changes': centroid_changes
    }

    return response

if __name__ == '__main__':
    result = train_kmedoids()
    print(result)