import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { periodicTable } from '../global_variables/elements';
import '../styles/search.css'
import { PeriodElement } from "../types/periodElement";


interface Props {
	setGuessedElement: Dispatch<SetStateAction<string>>
	search: string
	setSearch: Dispatch<SetStateAction<string>>
	firstSixMatching: PeriodElement[]
	setFirstSixMatching: Dispatch<SetStateAction<PeriodElement[]>>
}

const Search = ({ setGuessedElement, search, setSearch, firstSixMatching, setFirstSixMatching }: Props) => {

	//Handle changes in search
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)

		//Filter our list of elements based on search
		if (e.target.value.length > 0) {

			const matchingElements = periodicTable.filter((element) =>
				element.name.toLowerCase().includes(e.target.value.toLowerCase())
			);

			setFirstSixMatching(matchingElements.slice(0, 6));
		}

		else {
			setFirstSixMatching([])
		}
	}

	return (
		<div className="search-container">
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={handleChange}
			/>
			<ul>
				{firstSixMatching && firstSixMatching.map((item: PeriodElement, index) => (
					<li
						key={index}
						onClick={() => {
							setSearch(item.name)
							setGuessedElement(item.name)
						}}
						className={search === item.name ? "active" : ""}
					>
						{item.name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Search