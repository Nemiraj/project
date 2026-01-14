import React, { useEffect, useState } from "react";
import NewLaunchCard from "../NewLaunchCard";
import { useNavigate } from "react-router-dom";


const BACKEND_URL = "http://localhost:5000";

const FeaturedNewLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${BACKEND_URL}/api/new-launches`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("API did not return an array");

        setLaunches(data);
      } catch (err) {
        console.error("Error fetching launches:", err);
        setError(err.message || "Failed to load featured launches");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">
        Loading featured launches...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        {error} <br />
        Please check your backend server.
      </div>
    );
  }

  if (launches.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No featured launches found.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        New Launches
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {launches.map((launch) => (
          <NewLaunchCard
            key={launch.id}
            launch={launch}
            
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedNewLaunches;
