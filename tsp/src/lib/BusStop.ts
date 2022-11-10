export class BusStop {
	protected goal = false
	public readonly name: string
	protected people: number

	public constructor( options: { name: string, people: number } ) {
		this.name = options.name
		this.people = options.people
	}

	public getPeople(): number {
		return this.people
	}

	public isGoal(): boolean {
		return this.goal
	}

	public isEmpty(): boolean {
		return this.people === 0
	}

	public setGoal(): void {
		this.goal = true
	}

	public takePeople( max: number ): number {
		const amount = Math.min( this.people, max )
		this.people -= amount
		return amount
	}
}
