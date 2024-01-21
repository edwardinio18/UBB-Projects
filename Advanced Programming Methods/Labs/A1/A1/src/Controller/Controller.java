package Controller;

import Repo.*;
import Model.*;

public class Controller {
	private IRepo repo;

	public Controller(IRepo repo) {
		this.repo = repo;
	}

	public void add(Entity vehicle) throws Exception {
		try {
			this.repo.add(vehicle);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	public void remove(int index) throws Exception {
		try {
			this.repo.remove(index);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	public Entity[] getVehicles() {
		return this.repo.getVehicles();
	}

	public int getSize() {
		return this.repo.getSize();
	}

	public Entity[] filter() {
		Entity[] filtered = new Entity[this.repo.getCap()];
		int noFiltered = 0;

		for (int i = 0; i < this.repo.getSize(); ++i) {
			if (this.repo.getVehicles()[i].getRepairCost() > 1000) {
				filtered[noFiltered++] = this.repo.getVehicles()[i];
			}
		}

		return filtered;
	}

	public void generate() throws Exception {
		for (int i = 0; i < 5; ++i) {
			try {
				this.repo.add(new Car((int) (Math.random() * 2000)));
			} catch (Exception e) {
				throw new Exception(e.getMessage());
			}
		}

		for (int i = 0; i < 5; ++i) {
			try {
				this.repo.add(new Truck((int) (Math.random() * 2000)));
			} catch (Exception e) {
				throw new Exception(e.getMessage());
			}
		}

		for (int i = 0; i < 5; ++i) {
			try {
				this.repo.add(new Motorcycle((int) (Math.random() * 2000)));
			} catch (Exception e) {
				throw new Exception(e.getMessage());
			}
		}
	}
}