const pool = require("../config/database");

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ success: false, message: "Invalid name" });
    }

    if (typeof address !== "string" || !address.trim()) {
      return res.status(400).json({ success: false, message: "Invalid address" });
    }

    if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
      return res.status(400).json({ success: false, message: "Latitude must be between -90 and 90" });
    }

    if (typeof longitude !== "number" || longitude < -180 || longitude > 180) {
      return res.status(400).json({ success: false, message: "Longitude must be between -180 and 180" });
    }

    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), latitude, longitude]
    );

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: { id: result.insertId, name: name.trim(), address: address.trim(), latitude, longitude },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ success: false, message: "latitude and longitude are required" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || userLat < -90 || userLat > 90) {
      return res.status(400).json({ success: false, message: "Invalid latitude" });
    }

    if (isNaN(userLon) || userLon < -180 || userLon > 180) {
      return res.status(400).json({ success: false, message: "Invalid longitude" });
    }

    const [schools] = await pool.query("SELECT * FROM schools");

    if (!schools.length) {
      return res.status(200).json({ success: true, data: [] });
    }

    const sorted = schools
      .map((school) => ({
        ...school,
        distance: parseFloat(getDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      count: sorted.length,
      data: sorted,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { addSchool, listSchools };