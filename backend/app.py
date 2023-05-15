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



if __name__ == '__main__':
    app.run()


