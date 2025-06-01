import ReservationRequest from "@/src/models/dto/ReservationRequest";
import Hall from "@/src/models/entity/Hall";

type ReservationPickerProps = {
    changeFormData: (key: string, value:any) => void;
    formData?: ReservationRequest;
}

export default ReservationPickerProps;