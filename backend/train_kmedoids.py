import numpy as np
from scipy.spatial.distance import cdist
from sklearn_extra.cluster import KMedoids
from flask import jsonify
from models import Anak, Gizi
import time


def train_kmedoids():
    anak = Anak.query.all()
    gizi = Gizi.query.all()

    data = []
    for a, g in zip(anak, gizi):
        data.append([a.berat_lahir, a.tinggi_lahir, g.berat, g.tinggi])

    scaled_data = np.array(data)

    n_clusters = 3
    random_state = 12

    initial_medoids = np.array(
        [[3.1, 51, 11, 73.3], [2.9, 50, 11.6, 88], [2.7, 51, 10.5, 87.7]]
    )

    kmedoids = KMedoids(
        n_clusters=n_clusters,
        init=initial_medoids,
        max_iter=4,
        random_state=random_state,
        metric="euclidean",
    )

    start_time = time.time()

    kmedoids.fit(scaled_data)

    end_time = time.time()
    training_time = end_time - start_time

    cluster_count = n_clusters
    cluster_labels = []
    for label in kmedoids.labels_:
        if label == 2:
            cluster_labels.append("GIZI KURANG")
        elif label == 1:
            cluster_labels.append("GIZI BAIK")
        else:
            cluster_labels.append("GIZI LEBIH")

    response = {
        "cluster_count": cluster_count,
        "cluster_labels": cluster_labels,
        "initial_medoids": initial_medoids.tolist(),
        "total_iterations": kmedoids.n_iter_,
        "scaled_data": scaled_data.tolist(),
        "training_time": training_time,
    }

    return response


if __name__ == "__main__":
    result = train_kmedoids()
    print(result)
