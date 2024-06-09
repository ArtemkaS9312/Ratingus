import $api from "../http";

export default class AdminService {
    static fetchAdmin() {
        return $api.get('./admins');
    }
}
