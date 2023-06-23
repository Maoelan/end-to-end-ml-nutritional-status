import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from models import Anak, Gizi

def train_kmeans(anak_id, gizi_ids, n_clusters):

    anak = Anak.query.get(anak_id)
    berat_lahir = anak.berat_lahir
    tinggi_lahir = anak.tinggi_lahir

    gizi_data = Gizi.query.filter(Gizi.id.in_(gizi_ids)).all()
    usia_diukur = []
    berat = []
    tinggi = []
    for gizi in gizi_data:
        usia_diukur.append(gizi.usia_diukur)
        berat.append(gizi.berat)
        tinggi.append(gizi.tinggi)

    scaler = MinMaxScaler()
    berat_lahir = scaler.fit_transform(np.array([berat_lahir]).reshape(-1, 1))
    tinggi_lahir = scaler.fit_transform(np.array([tinggi_lahir]).reshape(-1, 1))
    usia_diukur = scaler.fit_transform(np.array(usia_diukur).reshape(-1, 1))
    berat = scaler.fit_transform(np.array(berat).reshape(-1, 1))
    tinggi = scaler.fit_transform(np.array(tinggi).reshape(-1, 1))

    X = np.hstrack((berat_lahir, tinggi_lahir, usia_diukur, berat, tinggi))

    n_clusters = 3
    kmeans = KMeans(n_clusters=n_clusters)
    kmeans.fit(X)

    iterations = []
    for i, label in enumerate(kmeans.labels_):
        iteration = {
            'cluster': label + 1,
            'berat_lahir': berat_lahir[i][0],
            'tinggi_lahir': tinggi_lahir[i][0],
            'usia_diukur': usia_diukur[i][0],
            'berat': berat[i][0],
            'tinggi': tinggi[i][0]
        }
        iterations.append(iteration)

    cluster_count = n_clusters
    centroid_changes = kmeans.inertia_

    return iterations, cluster_count, centroid_changes