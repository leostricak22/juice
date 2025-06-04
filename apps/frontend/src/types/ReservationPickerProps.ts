import ReservationRequest from "@/src/models/dto/ReservationRequest";
import Hall from "@/src/models/entity/Hall";
import User from "@/src/models/entity/User";

type ReservationPickerProps = {
    changeFormData: (key: string, value:any) => void;
    formData?: ReservationRequest;
    setFormData?: (data: ReservationRequest) => void;
    userData?: User;
}

export default ReservationPickerProps;