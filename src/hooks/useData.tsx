import { useOutletContext } from "react-router-dom";
import { User } from "../App";

export function useData() {
	return useOutletContext<{ data: Array<User>; loadMore: () => void }>();
}
