type ElementData = {
	name: string;
	period: number;
	group: number;
	electrons: number;
};


export const elements: ElementData[] = [
	{
		name: "Hydrogen",
		period: 1,
		group: 1,
		electrons: 1
	},
	{
		name: "Helium",
		period: 1,
		group: 18,
		electrons: 2
	},
	{
		name: "Lithium",
		period: 2,
		group: 1,
		electrons: 3
	},
	{
		name: "Carbon",
		period: 2,
		group: 14,
		electrons: 6
	},
	{
		name: "Oxygen",
		period: 2,
		group: 16,
		electrons: 8
	},
	{
		name: "Sodium",
		period: 3,
		group: 1,
		electrons: 11
	},
	{
		name: "Chlorine",
		period: 3,
		group: 17,
		electrons: 17
	}
];

export default ElementData