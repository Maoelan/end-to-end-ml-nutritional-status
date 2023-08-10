import numpy as np
from scipy.spatial.distance import cdist
from sklearn.cluster import KMeans
from flask import jsonify
from models import Anak, Gizi
import time


def train_kmeans():
    anak = Anak.query.all()
    gizi = Gizi.query.all()

    data = []
    for a, g in zip(anak, gizi):
        data.append([a.berat_lahir, a.tinggi_lahir, g.berat, g.tinggi])

    scaled_data = np.array(data)

    n_clusters = 3
    random_state = 12

    initial_centroids = np.array(
        [[3.1, 50, 9, 66], [2.8, 49, 12.6, 92.9], [2.9, 48, 12.9, 100.1]]
    )

    kmeans = KMeans(
        n_clusters=n_clusters, init=initial_centroids, random_state=random_state
    )

    start_time = time.time()

    kmeans.fit(scaled_data)

    end_time = time.time()
    training_time = end_time - start_time

    cluster_count = n_clusters
    cluster_labels = []
    for label in kmeans.labels_:
        if label == 2:
            cluster_labels.append("GIZI KURANG")
        elif label == 1:
            cluster_labels.append("GIZI BAIK")
        else:
            cluster_labels.append("GIZI LEBIH")

    response = {
        "cluster_count": cluster_count,
        "cluster_labels": cluster_labels,
        "initial_centroids": initial_centroids.tolist(),
        "total_iterations": kmeans.n_iter_,
        "scaled_data": scaled_data.tolist(),
        "training_time": training_time,
    }

    return response


if __name__ == "__main__":
    result = train_kmeans()
    print(result)
