import Cards from "../components/Cards";
import EmptySaved from "../components/EmptySaved";

const SavedUsers = () => {
	const data = JSON.parse(window.localStorage.getItem("savedUsers"));

	if (data) {
		return <Cards data={data} saved={true} />;
	}

	return <EmptySaved />;
};

export default SavedUsers;
