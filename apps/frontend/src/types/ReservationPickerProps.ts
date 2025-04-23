import ReservationRequest from "@/src/models/dto/ReservationRequest";

type ReservationPickerProps = {
    changeFormData: (key: string, value:any) => void;
    formData?: ReservationRequest;
}

export default ReservationPickerProps;