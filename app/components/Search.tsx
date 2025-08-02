import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { periodicTable } from '../global_variables/elements';
import '../styles/search.css'

type Element = {
	name: string
	symbol: string
}

interface Props {
	setGuessedElement: Dispatch<SetStateAction<string>>
}

const Search = ({ setGuessedElement }: Props) => {
	const [search, setSearch] = useState<string>("")
	const [firstSixMatching, setFirstSixMatching] = useState<Element[]>([]);

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
				{firstSixMatching && firstSixMatching.map((item: Element, index) => (
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