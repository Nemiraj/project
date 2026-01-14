import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import NewLaunchCard from "../compontents/NewLaunchCard";

const NewLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getNewLaunches();
      setLaunches(data);
    } catch (error) {
      console.error("Failed to load new launches:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading New Launches...</p>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-10">
          New Launch Projects
        </h2>

        {launches.length === 0 ? (
          <p>No new launches available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {launches.map((launch) => (
              <NewLaunchCard key={launch.id} launch={launch} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewLaunches;
