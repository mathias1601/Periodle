import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
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
	const [displaySearch, setDisplaySearch] = useState<boolean>(false)

	const searchContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!searchContainerRef.current?.contains(event.target as Node)) {
				setDisplaySearch(false)
			}
		}

		// Add event listener on render
		document.addEventListener("mousedown", handleClickOutside)

		// Clean up event listener on unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	//Handle changes in search
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)

		//Filter our list of elements based on search
		if (e.target.value.length > 0) {

			const matchingElements = periodicTable.filter((element) =>
				element.name.toLowerCase().includes(e.target.value.toLowerCase())
			);

			setFirstSixMatching(matchingElements.slice(0, 6));
			setDisplaySearch(true)
		}

		else {
			setFirstSixMatching([])
		}
	}

	return (
		<div className="search-container" ref={searchContainerRef}>
			<input
				type="text"
				placeholder="Guess an element..."
				value={search}
				onChange={handleChange}
				onClick={() => setDisplaySearch(true)}
			/>
			<ul>
				{displaySearch && firstSixMatching && firstSixMatching.map((item: PeriodElement, index) => (
					<li
						key={index}
						onClick={() => {
							setSearch(item.name)
							setGuessedElement(item.name)
							setFirstSixMatching([])
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
