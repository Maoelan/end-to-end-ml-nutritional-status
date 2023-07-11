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
        data.append([
            a.berat_lahir,
            a.tinggi_lahir,
            g.berat,
            g.tinggi
        ])

    scaled_data = np.array(data)

    n_clusters = 3
    random_state = 12

    initial_centroids = np.array([
        [3.1, 50, 9, 66],  
        [2.8, 49, 12.6, 92.9],  
        [2.9, 48, 12.9, 100.1]
    ])

    kmeans = KMeans(n_clusters=n_clusters, init=initial_centroids, random_state=random_state)

    start_time = time.time()

    kmeans.fit(scaled_data)

    end_time = time.time()
    training_time = end_time - start_time

    iterations = []
    total_iterations = kmeans.n_iter_

    for i in range(total_iterations):
        iteration = {}
        current_kmeans = KMeans(n_clusters=n_clusters, init=kmeans.cluster_centers_, random_state=random_state)
        current_kmeans.cluster_centers_ = kmeans.cluster_centers_
        current_kmeans.labels_ = kmeans.predict(scaled_data)

        centroid_changes = []

        for j in range(n_clusters):
            cluster_indices = np.where(current_kmeans.labels_ == j)[0]
            cluster_points = scaled_data[cluster_indices]
            centroid = kmeans.cluster_centers_[j]
            centroid_change = np.mean(cdist(cluster_points, np.expand_dims(centroid, axis=0)))
            centroid_changes.append(centroid_change)

        iteration['centroid_changes'] = centroid_changes

        for j in range(n_clusters):
            cluster_points = []
            for index, point in enumerate(scaled_data):
                if current_kmeans.labels_[index] == j:
                    cluster_points.append(point.tolist())
            iteration[f'cluster_{j+1}'] = cluster_points

        iterations.append(iteration)

        kmeans.fit(scaled_data)

        print(f"Iteration {i+1} - Centroid Changes:")
        for j, centroid_change in enumerate(centroid_changes):
            print(f"C{j+1}: {centroid_change}")
    
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
        'iterations': iterations,
        'cluster_count': cluster_count,
        'cluster_labels': cluster_labels,
        'initial_centroids': initial_centroids.tolist(),
        'total_iterations': total_iterations,
        'scaled_data': scaled_data.tolist(),
        'training_time': training_time
    }

    return response

if __name__ == '__main__':
    result = train_kmeans()
    print(result)