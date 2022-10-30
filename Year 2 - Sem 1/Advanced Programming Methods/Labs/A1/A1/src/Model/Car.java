package Model;

public class Car implements Entity {
	private int repairCost = 0;

	public Car() {
		super();
	}

	public Car(int repairCost) {
		this.repairCost = repairCost;
	}

	public int getRepairCost() {
		return this.repairCost;
	}

	@Override
	public String toString() {
		return "Car [repairCost=" + getRepairCost() + "]";
	}
}