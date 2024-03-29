from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config.config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy()
migrate = Migrate()

db.init_app(app)
migrate.init_app(app, db)

CORS(app)

app.debug = True

from models import OrangTua, Anak, Gizi, User, Label
from train_kmeans import train_kmeans
from train_kmedoids import train_kmedoids


@app.route("/api/orangtua/get", methods=["GET"])
def get_orangtua():
    orangtua = OrangTua.query.all()
    result = []

    for x in orangtua:
        data = {
            "id": x.id,
            "nama": x.nama,
            "alamat": x.alamat,
            "provinsi": x.provinsi,
            "kabupaten": x.kabupaten,
            "kecamatan": x.kecamatan,
            "desa": x.desa,
            "posyandu": x.posyandu,
            "rt": x.rt,
            "rw": x.rw,
        }
        result.append(data)

    return jsonify(result)


@app.route("/api/orangtua/get/<int:id>", methods=["GET"])
def get_orangtua_by_id(id):
    orangtua = OrangTua.query.get(id)
    if orangtua is None:
        return jsonify({"message": "Data orang tua tidak ditemukan"})

    data = {
        "id": orangtua.id,
        "nama": orangtua.nama,
        "alamat": orangtua.alamat,
        "provinsi": orangtua.provinsi,
        "kabupaten": orangtua.kabupaten,
        "kecamatan": orangtua.kecamatan,
        "desa": orangtua.desa,
        "posyandu": orangtua.posyandu,
        "rt": orangtua.rt,
        "rw": orangtua.rw,
    }

    return jsonify(data)


@app.route("/api/orangtua/add", methods=["POST"])
def add_orangtua():
    data = request.get_json()

    orangtua = OrangTua(
        nama=data["nama"],
        alamat=data["alamat"],
        provinsi=data["provinsi"],
        kabupaten=data["kabupaten"],
        kecamatan=data["kecamatan"],
        desa=data["desa"],
        posyandu=data["posyandu"],
        rt=data["rt"],
        rw=data["rw"],
    )

    db.session.add(orangtua)
    db.session.commit()

    return jsonify({"message": "Data orang tua berhasil ditambahkan"})


@app.route("/api/orangtua/update/<int:id>", methods=["PUT"])
def update_orangtua(id):
    data = request.get_json()

    orangtua = OrangTua.query.get(id)
    if orangtua is None:
        return jsonify({"message": "Data orang tua tidak ditemukan"})

    orangtua.nama = data["nama"]
    orangtua.alamat = data["alamat"]
    orangtua.provinsi = data["provinsi"]
    orangtua.kabupaten = data["kabupaten"]
    orangtua.kecamatan = data["kecamatan"]
    orangtua.desa = data["desa"]
    orangtua.posyandu = data["posyandu"]
    orangtua.rt = data["rt"]
    orangtua.rw = data["rw"]

    db.session.commit()

    return jsonify({"message": "Data orang tua berhasil diupdate"})


@app.route("/api/orangtua/delete/<int:id>", methods=["DELETE"])
def delete_orangtua(id):
    orangtua = OrangTua.query.get(id)
    if orangtua:
        db.session.delete(orangtua)
        db.session.commit()

        return jsonify({"message": "Data orang tua berhasil dihapus"})

    return jsonify({"message": "Data orang tua tidak ditemukan"})


@app.route("/api/anak/get", methods=["GET"])
def get_anak():
    anak = Anak.query.all()
    result = []

    for x in anak:
        data = {
            "id": x.id,
            "nik": x.nik,
            "nama": x.nama,
            "jenis_kelamin": x.jenis_kelamin,
            "tanggal_lahir": x.tanggal_lahir,
            "berat_lahir": x.berat_lahir,
            "tinggi_lahir": x.tinggi_lahir,
            "id_orang_tua": x.id_orang_tua,
        }
        result.append(data)

    return jsonify(result)


@app.route("/api/anak/get/<int:id>", methods=["GET"])
def get_anak_by_id(id):
    anak = Anak.query.get(id)
    if anak is None:
        return jsonify({"message": "Data anak tidak ditemukan"})

    data = {
        "id": anak.id,
        "nik": anak.nik,
        "nama": anak.nama,
        "jenis_kelamin": anak.jenis_kelamin,
        "tanggal_lahir": anak.tanggal_lahir,
        "berat_lahir": anak.berat_lahir,
        "tinggi_lahir": anak.tinggi_lahir,
        "id_orang_tua": anak.id_orang_tua,
    }

    return jsonify(data)


@app.route("/api/anak/add", methods=["POST"])
def add_anak():
    data = request.get_json()

    anak = Anak(
        nik=data["nik"],
        nama=data["nama"],
        jenis_kelamin=data["jenis_kelamin"],
        tanggal_lahir=data["tanggal_lahir"],
        berat_lahir=data["berat_lahir"],
        tinggi_lahir=data["tinggi_lahir"],
        id_orang_tua=data["id_orang_tua"],
    )
    db.session.add(anak)
    db.session.commit()

    return jsonify({"message": "Data anak berhasil ditambahkan"})


@app.route("/api/anak/update/<int:id>", methods=["PUT"])
def update_anak(id):
    data = request.get_json()

    anak = Anak.query.get(id)
    if anak is None:
        return jsonify({"message": "Data anak tidak ditemukan"})

    anak.nik = data["nik"]
    anak.nama = data["nama"]
    anak.jenis_kelamin = data["jenis_kelamin"]
    anak.tanggal_lahir = data["tanggal_lahir"]
    anak.berat_lahir = data["berat_lahir"]
    anak.tinggi_lahir = data["tinggi_lahir"]
    anak.id_orang_tua = data["id_orang_tua"]

    db.session.commit()

    return jsonify({"message": "Data anak berhasil diupdate"})


@app.route("/api/anak/delete/<int:id>", methods=["DELETE"])
def delete_anak(id):
    anak = Anak.query.get(id)
    if anak:
        db.session.delete(anak)
        db.session.commit()

        return jsonify({"message": "Data anak berhasil dihapus"})

    return jsonify({"message": "Data anak tidak ditemukan"})


@app.route("/api/gizi/get", methods=["GET"])
def get_gizi():
    gizi = Gizi.query.all()
    result = []

    for x in gizi:
        data = {
            "id": x.id,
            "id_anak": x.id_anak,
            "usia_diukur": x.usia_diukur,
            "tanggal_pengukuran": x.tanggal_pengukuran,
            "berat": x.berat,
            "tinggi": x.tinggi,
            "jumlah_vitamin_a": x.jumlah_vitamin_a,
        }
        result.append(data)

    return jsonify(result)


@app.route("/api/gizi/get/<int:id>", methods=["GET"])
def get_gizi_by_id(id):
    gizi = Gizi.query.get(id)
    if gizi is None:
        return jsonify({"message": "Data anak tidak ditemukan"})

    data = {
        "id": gizi.id,
        "id_anak": gizi.id_anak,
        "usia_diukur": gizi.usia_diukur,
        "tanggal_pengukuran": gizi.tanggal_pengukuran,
        "berat": gizi.berat,
        "tinggi": gizi.tinggi,
        "jumlah_vitamin_a": gizi.jumlah_vitamin_a,
    }

    return jsonify(data)


@app.route("/api/gizi/add", methods=["POST"])
def add_gizi():
    data = request.get_json()

    gizi = Gizi(
        id_anak=data["id_anak"],
        usia_diukur=data["usia_diukur"],
        tanggal_pengukuran=data["tanggal_pengukuran"],
        berat=data["berat"],
        tinggi=data["tinggi"],
        jumlah_vitamin_a=data["jumlah_vitamin_a"],
    )

    db.session.add(gizi)
    db.session.commit()

    return jsonify({"message": "Data gizi berhasil ditambahkan"})


@app.route("/api/gizi/update/<int:id>", methods=["PUT"])
def update_gizi(id):
    data = request.get_json()

    gizi = Gizi.query.get(id)
    if gizi is None:
        return jsonify({"message": "Data gizi tidak ditemukan"})

    gizi.id_anak = data["id_anak"]
    gizi.usia_diukur = data["usia_diukur"]
    gizi.tanggal_pengukuran = data["tanggal_pengukuran"]
    gizi.berat = data["berat"]
    gizi.tinggi = data["tinggi"]
    gizi.jumlah_vitamin_a = data["jumlah_vitamin_a"]

    db.session.commit()

    return jsonify({"message": "Data gizi berhasil diupdate"})


@app.route("/api/gizi/delete/<int:id>", methods=["DELETE"])
def delete_gizi(id):
    gizi = Gizi.query.get(id)
    if gizi:
        db.session.delete(gizi)
        db.session.commit()

        return jsonify({"message": "Data gizi berhasil dihapus"})

    return jsonify({"message": "Data gizi tidak ditemukan"})


@app.route("/api/user/get", methods=["GET"])
def get_user():
    users = User.query.all()
    result = []

    for user in users:
        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "password": user.password,
            "role": user.role,
        }
        result.append(data)

    return jsonify(result)


@app.route("/api/user/add", methods=["POST"])
def add_user():
    data = request.get_json()

    user = User(
        username=data["username"],
        email=data["email"],
        password=data["password"],
        role=data["role"],
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Data user berhasil ditambahkan"})


@app.route("/api/user/update/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.get_json()

    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "Data user tidak ditemukan"})

    user.username = data["username"]
    user.email = data["email"]
    user.password = data["password"]
    user.role = data["role"]

    db.session.commit()

    return jsonify({"message": "Data user berhasil diupdate"})


@app.route("/api/user/delete/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "Data user berhasil dihapus"})

    return jsonify({"message": "Data user tidak ditemukan"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data["username"]
    password = data["password"]

    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return jsonify({"message": "Login Berhasil"})

    return jsonify({"message": "Username atau password salah"})


@app.route("/api/label/add", methods=["POST"])
def add_label():
    data = request.get_json()

    label = Label(label_aktual=data["label_aktual"])

    db.session.add(label)
    db.session.commit()

    return jsonify({"message": "Data label berhasil ditambahkan"})


@app.route("/api/label/get", methods=["GET"])
def get_label():
    label = Label.query.all()
    result = []

    for x in label:
        data = {
            "label_aktual": x.label_aktual,
        }
        result.append(data)

    return jsonify(result)


@app.route("/api/label/delete", methods=["DELETE"])
def delete_all_labels():
    Label.query.delete()
    db.session.commit()

    return jsonify({"message": "Semua data label berhasil dihapus"})

@app.route("/api/label/delete/<int:id>", methods=["DELETE"])
def delete_label(id):
    label = Label.query.get(id)
    if label:
        db.session.delete(label)
        db.session.commit()
        
        return jsonify({"message": "Data label aktual berhasil dihapus"})
    
    return jsonify({"message": "Data label aktual tidak ditemukan"})


@app.route("/api/train_kmeans", methods=["GET", "POST"])
def train_kmeans_route():
    result = train_kmeans()
    return jsonify(result)


@app.route("/api/train_kmedoids", methods=["GET", "POST"])
def train_kmedoids_route():
    result = train_kmedoids()
    return jsonify(result)


if __name__ == "__main__":
    app.run()
