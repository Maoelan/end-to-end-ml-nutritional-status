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
        data.append([
            a.berat_lahir,
            a.tinggi_lahir,
            g.berat,
            g.tinggi
        ])

    scaled_data = np.array(data)

    n_clusters = 3
    random_state = 12

    initial_medoids = np.array([
        [3.1, 51, 11, 73.3],  
        [2.9, 50, 11.6, 88],  
        [2.7, 51, 10.5, 87.7]
    ])

    kmedoids = KMedoids(n_clusters=n_clusters, init=initial_medoids, max_iter=4, random_state=random_state, metric='euclidean')

    start_time = time.time()

    kmedoids.fit(scaled_data)

    end_time = time.time()
    training_time = end_time - start_time

    iterations = []
    total_iterations = kmedoids.n_iter_

    for i in range(total_iterations):
        iteration = {}
        current_kmedoids = KMedoids(n_clusters=n_clusters, init=kmedoids.medoid_indices_, random_state=random_state, metric='euclidean')
        current_kmedoids.medoid_indices_ = kmedoids.medoid_indices_
        current_kmedoids.labels_ = kmedoids.predict(scaled_data)

        medoid_changes = []

        for j in range(n_clusters):
            cluster_indices = np.where(current_kmedoids.labels_ == j)[0]
            cluster_points = scaled_data[cluster_indices]
            medoid_index = kmedoids.medoid_indices_[j]
            medoid_change = np.mean(cdist(cluster_points, np.expand_dims(scaled_data[medoid_index], axis=0)))
            medoid_changes.append(medoid_change)

        iteration['medoid_changes'] = medoid_changes

        for j in range(n_clusters):
            cluster_points = []
            for index, point in enumerate(scaled_data):
                if current_kmedoids.labels_[index] == j:
                    cluster_points.append(point.tolist())
            iteration[f'cluster_{j+1}'] = cluster_points

        iterations.append(iteration)

        kmedoids.fit(scaled_data)

        print(f"Iteration {i+1} - Medoid Changes:")
        for j, medoid_change in enumerate(medoid_changes):
            print(f"M{j+1}: {medoid_change}")
    
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
        'iterations': iterations,
        'cluster_count': cluster_count,
        'cluster_labels': cluster_labels,
        'initial_medoids': initial_medoids.tolist(),
        'total_iterations': total_iterations,
        'scaled_data': scaled_data.tolist(),
        'training_time': training_time
    }

    return response

if __name__ == '__main__':
    result = train_kmedoids()
    print(result)