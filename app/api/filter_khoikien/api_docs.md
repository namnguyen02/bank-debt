- [filter\_khoikien](#filter_khoikien)
  - [GET /api/filter\_khoikien](#get-apifilter_khoikien)

# filter_khoikien
## GET /api/filter_khoikien

Get return data by sending data in filters using search function

**Request Parameters**
- Request Parameters must have more than one key. (*offset* and *limit*).
- Request Parameters inside must contains at least one of these keys:
  - ma_khoi_kien
  - trang_thai
  - tinh_tp
  - quan_huyen
  - so_tien_kk
  - ma_khach_hang
  - ho_ten
  - can_cuoc
  - ma_nhan_vien
```json
GET /api/filter_khoikien/?ma_khoi_kien=15&offset=0&limit=10
```

**Response**
- 200 Created: When query is successful
- 400 Bad Request: If invalid data is passed
- 500 Internal Server Error: If query fails (wrong format)

```json
{
    "count": 1,
    "next": null,
    "prev": null,
    "result": [
        {
            "ma_khoi_kien": 15,
            "trang_thai": "Nộp hồ sơ",
            "tinh_tp": "Bắc Giang",
            "quan_huyen": "Huyện Yên Thế",
            "so_tien_kk": 100000000,
            "ma_khach_hang": 519455,
            "ho_ten": "Dương Mỹ Duyên",
            "can_cuoc": "046202002065",
            "ma_nhan_vien": "SHB-20240001"
        }
    ]
}
```