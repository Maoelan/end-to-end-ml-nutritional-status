from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import OrangTua, Anak, Gizi, User


@app.route('/api/orangtua/get', methods=['GET'])
def get_orangtua():
    orangtua = OrangTua.query.all()
    result = []

    for x in orangtua:
        data = {
            'id' : x.id,
            'nama' : x.nama,
            'alamat' : x.alamat,
            'provinsi' : x.provinsi,
            'kabupaten' : x.kabupaten,
            'kecamatan' : x.desa,
            'posyandu' : x.posyandu,
            'rt' : x.rt,
            'rw' : x.rw 
        }
        result.append(data)
    
    return jsonify(result)

@app.route('/api/orangtua/add', methods=['POST'])
def add_orangtua():
    data = request.get_json()

    orangtua = OrangTua(
        nama = data['nama'],
        alamat = data['alamat'],
        provinsi = data['provinsi'],
        kabupaten = data['kabupaten'],
        kecamatan = data['kecamatan'],
        desa = data['desa'],
        posyandu = data['posyandu'],
        rt = data['rt'],
        rw = data['rw']
    )

    db.session.add(orangtua)
    db.session.commit()

    return jsonify({'message': 'Data orang tua berhasil ditambahkan'})

@app.route('/api/orangtua/update/<int:id>', methods=['PUT'])
def update_orangtua(id):
    data = request.get_json()

    orangtua = OrangTua.query.get(id)
    if orangtua is None:
        return jsonify({'message': 'Data orang tua tidak ditemukan'})
    
    orangtua.nama = data['nama']
    orangtua.alamat = data['alamat']
    orangtua.provinsi = data['provinsi']
    orangtua.kabupaten = data['kabupaten']
    orangtua.kecamatan = data['kecamatan']
    orangtua.desa = data['desa']
    orangtua.posyandu = data['posyandu']
    orangtua.rt = data['rt']
    orangtua.rw = data['rw']

    db.session.commit()

    return jsonify({'message': 'Data orang tua berhasil diupdate'})

@app.route('/api/orangtua/delete/<int:id>', methods=['DELETE'])
def delete_orangtua(id):
    orangtua = OrangTua.query.get(id)
    if orangtua is None:
        return jsonify({'message': 'Data orang tua tidak ditemukan'})
    
    db.session.delete(orangtua)
    db.session.commit()

    return jsonify({'message': 'Data orang tua berhasil dihapus'})


@app.route('/api/anak/get', methods=['GET'])
def get_anak():
    anak = Anak.query.all()
    result = []

    for x in anak:
        data = {
            'id' : x.id,
            'nik' : x.nik,
            'nama' : x.nama,
            'jenis_kelamin' : x.jenis_kelamin,
            'tanggal_lahir' : x.tanggal_lahir,
            'berat_lahir' : x.berat_lahir,
            'tinggi_lahir' : x.tinggi_lahir,
            'id_orang_tua' : x.di_orang_tua,
        }
        result.append(data)
    
    return jsonify(result)

@app.route('/api/anak/add', methods=['POST'])
def add_anak():
    data = request.get_json()

    anak = Anak(
        nik = data['nik'],
        nama = data['nama'],
        jenis_kelamin = data['jenis_kelamin'],
        tanggal_lahir = data['tanggal_lahir'],
        berat_lahir = data['berat_lahir'],
        tinggi_lahir = data['tinggi_lahir'],
        id_orang_tua = data['id_orang_tua']
    )
    db.session.add(anak)
    db.session.commit()

    return jsonify({'message': 'Data anak berhasil ditambahkan'})

@app.route('/api/anak/update/<int:id>', methods=['PUT'])
def update_anak(id):
    data = request.get_json()

    anak = Anak.query.get(id)
    if anak is None:
        return jsonify({'message': 'Data anak tidak ditemukan'})
    
    anak.nik = data['nik']
    anak.nama = data['nama']
    anak.jenis_kelamin = data['jenis_kelamin']
    anak.tanggal_lahir = data['tanggal_lahir']
    anak.berat_lahir = data['berat_lahir']
    anak.tinggi_lahir = data['tinggi_lahir']
    anak.id_orang_tua = data['id_orang_tua']

    db.session.commit()

    return jsonify({'message': 'Data anak berhasil diupdate'})

@app.route('/api/anak/delete/<int:id>', methods=['DELETE'])
def delete_anak(id):
    anak = Anak.query.get(id)
    if anak is None:
        return jsonify({'message': 'Data anak tidak ditemukan'})
    
    db.session.delete(anak)
    db.session.commit()

    return jsonify({'message': 'Data anak berhasil dihapus'})


@app.route('/api/gizi/get', methods=['GET'])
def get_gizi():

@app.route('/api/gizi/add', methods=['POST'])
def add_gizi():

@app.route('/api/gizi/update/<int:id>', methods=['PUT'])
def update_gizi():

@app.route('/api/gizi/delete/<int:id>', methods=['DELETE'])
def delete_gizi():

@app.route('/api/login/get', methods=['GET'])
def get_user():

@app.route('/api/login/add', methods=['POST'])
def add_user():

@app.route('/api/login/update/<int:id>', methods=['PUT'])
def update_user():

@app.route('/api/login/delete/<int:id>', methods=['DELETE'])
def delete_user():



if __name__ == '__main__':
    app.run()



