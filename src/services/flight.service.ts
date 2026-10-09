import type { FlightModel } from "@/models/flight-model";
import axios from "axios";

const client = axios.create({
  baseURL: "https://flight.pequla.com/api/flight",
  headers: {
    Accept: "application/json",
    "X-Name": "PKI-2026",
  },
});

export class FlightService {
  static async getDepartures(): Promise<FlightModel[]> {
    const rsp = await client.request({
      method: "GET",
      url: "/list",
      params: {
        type: "departure",
      },
    });

    let flights = [];

    for (let obj of rsp.data) {
      flights.push({
        id: obj.id,
        destination: obj.destination,
        imgUrl: this.getImageUrl(obj),
        flightNumber: obj.flightNumber,
        scheduledAt: obj.scheduledAt,
      });
    }
    return (flights = flights.sort(
      (a: any, b: any) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    ));
  }

  static async getDepartureDetails(id: number) {
    const details = await client.get(`/${id}`);

    const other = await client.request({
      method: "GET",
      url: `/destination/${details.data.destination}`,
      params: {
        type: "departure",
        size: 10,
      },
    });

    return {
      id: details.data.id,
      destination: details.data.destination,
      imgUrl: this.getImageUrl(details.data),
      flightNumber: details.data.flightNumber,
      scheduledAt: details.data.scheduledAt,
      other: other.data.content,
    };
  }

  static getImageUrl(obj: any) {
    return `https://img.pequla.com/destination/${obj.destination.split(" ")[0].toLowerCase()}.jpg`;
  }
}
