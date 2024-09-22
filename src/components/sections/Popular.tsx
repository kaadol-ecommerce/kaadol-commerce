import React from 'react'
import MotorAd from '../cards/MotorAd';
import { PopularResponse } from "@/pages";

export default function Popular({ data }: { data: PopularResponse }) {
  const { motors, houses, plots } = data;
  return (
    <div className="mt-5">
      <div>
        <h1 className="font-bold text-blue-950 text-2xl pb-3">
          Popular in Cars
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
          {motors.map((motor) => (
            <MotorAd key={motor.id} data={motor} />
          ))}
        </div>
      </div>
    </div>
  );
}
