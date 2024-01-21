package Model;

public class Motorcycle implements Entity {
	private int repairCost = 0;

	public Motorcycle() {
		super();
	}

	public Motorcycle(int repairCost) {
		this.repairCost = repairCost;
	}

	public int getRepairCost() {
		return this.repairCost;
	}

	@Override
	public String toString() {
		return "Motorcycle [repairCost=" + getRepairCost() + "]";
	}
}