package Repo;

import Model.Entity;

public interface IRepo {
	public void add(Entity vehicle) throws Exception;

	public void remove(int index) throws Exception;

	public Entity[] getVehicles();

	public int getSize();

	public int getCap();
}