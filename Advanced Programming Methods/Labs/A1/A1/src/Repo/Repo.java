package Repo;

import Model.Entity;

public class Repo implements IRepo {

	private int noVehicles = 0;
	private int capVehicles = 50;
	private Entity[] vehicles = new Entity[capVehicles];
	@Override
	public void add(Entity vehicle) throws Exception {
		try {
			this.vehicles[this.noVehicles] = vehicle;
			++this.noVehicles;
		} catch (Exception e) {
			throw new Exception("Maximum capacity reached!");
		}
	}

	@Override
	public void remove(int index) throws Exception {
		try {
			if (index >= this.noVehicles || index < 0) throw new Exception("Index out of bounds!");
			for (int i = index; i < this.noVehicles; ++i) {
				this.vehicles[i] = this.vehicles[i + 1];
			}
			--this.noVehicles;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public Entity[] getVehicles() {
		return this.vehicles;
	}

	@Override
	public int getSize() {
		return this.noVehicles;
	}

	public int getCap() {
		return this.capVehicles;
	}
}