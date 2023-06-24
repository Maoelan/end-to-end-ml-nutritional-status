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
    kmeans = KMeans(n_clusters=n_clusters)
    kmeans.fit(scaled_data)

    iterations = []
    for i, labels in enumerate(kmeans.labels_):
        iteration = {}
        for j in range(n_clusters):
            cluster_points = scaled_data[labels == j].tolist()
            iteration[f'cluster_{j+1}'] = cluster_points
        iterations.append(iteration)

    cluster_count = n_clusters
    centroid_changes = kmeans.inertia_

    response = {
        'iterations': iterations,
        'cluster_count': cluster_count,
        'centroid_changes': centroid_changes
    }

    return response

if __name__ == '__main__':
    result = train_kmeans()
    print(result)