import React from 'react'
import MotorAd from '../cards/MotorAd';
import { PopularResponse } from "@/pages";
import PlotAd from '../cards/PlotAd';
import HouseAd from '../cards/HouseAd';

export default function Popular({ data }: { data: PopularResponse }) {
  const { motors, houses, plots } = data;
  return (
    <div className="mt-5 flex flex-col my-10">
      <div className="mt-6">
        <h1 className="font-bold text-blue-950 text-2xl md:text-3xl pb-3">
          Popular in Cars
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
          {motors.slice(0, 4).map((motor) => (
            <MotorAd key={motor.id} data={motor} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h1 className="font-bold text-blue-950 text-2xl md:text-3xl pb-3">
          Popular in Plots
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
          {plots.slice(0, 4).map((plot) => (
            <PlotAd key={plot.id} data={plot} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h1 className="font-bold text-blue-950 text-2xl md:text-3xl pb-3">
          Popular in Houses
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
          {houses.slice(0, 4).map((house) => (
            <HouseAd key={house.id} data={house} />
          ))}
        </div>
      </div>
    </div>
  );
}
