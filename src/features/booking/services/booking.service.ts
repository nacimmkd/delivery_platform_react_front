import api from "@/app/config/axios.config";
import type { BookingDto, CreateBookingRequest } from "@/shared/types";

const bookingService = {

    async createBooking(data: CreateBookingRequest): Promise<BookingDto> {
        const res = await api.post<BookingDto>("/bookings", data);
        return res.data;
    },

    async getBooking(id: string): Promise<BookingDto> {
        const res = await api.get<BookingDto>(`/bookings/${id}`);
        return res.data;
    },

    async cancelBooking(id: string): Promise<void> {
        await api.patch(`/bookings/${id}/cancel`);
    },

};

export default bookingService;
