export type Motor = {
    id: number;
    title: string;
    exteriorColor: string;
    doors: number;
    bodyType: string;
    sellerType: string;
    seatingCapacity: number;
    fuelType: string;
    steelingSide: string;
    location: string;
    year: number;
    kilometers: number;
    price: number;
    features: string[];
    owner: number;
};

export type House = {
    id: number;
    title: string;
    location: string;
    longitude: string;
    latitude: string;
    price: string;
    owner: number;
    description: string;
    subCategory: number;
};

export type Plot = {
    id: number;
    title: string;
    location: string;
    longitude: string;
    latitude: string;
    price: string;
    owner: number;
    description: string;
    subCategory: number;
};


export type SubCategory = {
    id: number;
    name: string;
    category: string;
    description: string;
}

export type Purchase = {
    id: number;
    owner: number;
    plan: number;
    reference: string;
    motor: number | null;
    house: number | null;
    plot: number | null;
    status: string;
}

export type Plan = {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
}