package Model;

public class Truck implements Entity {
	private int repairCost = 0;

	public Truck() {
		super();
	}

	public Truck(int repairCost) {
		this.repairCost = repairCost;
	}

	public int getRepairCost() {
		return this.repairCost;
	}

	@Override
	public String toString() {
		return "Truck [repairCost=" + getRepairCost() + "]";
	}
}