package View;

import Controller.*;
import Model.*;
import Repo.IRepo;

import java.util.Scanner;

public class View {
	private Controller cont;

	public View(Controller cont) {
		this.cont = cont;
	}

	public void printMenu() {
		System.out.println("1. Add vehicle");
		System.out.println("2. Remove vehicle");
		System.out.println("3. Display all vehicles");
		System.out.println("4. Display all vehicles with repair cost greater than 1000");
		System.out.println("5. Exit");
	}

	public void addVehicle() throws Exception {
		String option;

		while (true) {
			System.out.println("------------------------------------------------------------------------");
			System.out.println("1. Car");
			System.out.println("2. Truck");
			System.out.println("3. Motorcycle");
			System.out.println("4. Back");
			System.out.println("------------------------------------------------------------------------");
			System.out.println("Please select an option:");

			int nOption;
			while (true) {
				try {
					option = new Scanner(System.in).nextLine();
					nOption = Integer.parseInt(option);
					if (nOption < 1 || nOption > 4) {
						System.out.println("------------------------------------------------------------------------");
						System.out.println("Invalid input, please try again!");
						System.out.println("------------------------------------------------------------------------");
					} else break;
				} catch (Exception e) {
					System.out.println("------------------------------------------------------------------------");
					System.out.println("Invalid input, please try again!");
					System.out.println("------------------------------------------------------------------------");
				}
			}

			if (nOption == 1) {
				String repairCost;
				int nRepairCost;
				while (true) {
					try {
						System.out.println("Enter a repair cost for this vehicle:");
						repairCost = new Scanner(System.in).nextLine();
						nRepairCost = Integer.parseInt(repairCost);
						if (nRepairCost < 1) {
							System.out.println("------------------------------------------------------------------------");
							System.out.println("Invalid input, please try again!");
							System.out.println("------------------------------------------------------------------------");
						} else break;
					} catch (Exception e) {
						System.out.println("------------------------------------------------------------------------");
						System.out.println("Invalid input, please try again!");
						System.out.println("------------------------------------------------------------------------");
					}
				}
				Entity car = new Car(nRepairCost);
				try {
					this.cont.add(car);
					System.out.println("------------------------------------------------------------------------");
					System.out.println("Vehicle succesfully added to the repair shop!");
					System.out.println("------------------------------------------------------------------------");
					return;
				} catch (Exception e) {
					throw new Exception(e.getMessage());
				}
			} else if (nOption == 2) {
				String repairCost;
				int nRepairCost;
				while (true) {
					try {
						System.out.println("Enter a repair cost for this vehicle:");
						repairCost = new Scanner(System.in).nextLine();
						nRepairCost = Integer.parseInt(repairCost);
						if (nRepairCost < 1) {
							System.out.println("------------------------------------------------------------------------");
							System.out.println("Invalid input, please try again!");
							System.out.println("------------------------------------------------------------------------");
						} else break;
					} catch (Exception e) {
						System.out.println("------------------------------------------------------------------------");
						System.out.println("Invalid input, please try again!");
						System.out.println("------------------------------------------------------------------------");
					}
				}
				Entity truck = new Truck(nRepairCost);
				try {
					this.cont.add(truck);
					System.out.println("------------------------------------------------------------------------");
					System.out.println("Vehicle succesfully added to the repair shop!");
					System.out.println("------------------------------------------------------------------------");
					return;
				} catch (Exception e) {
					throw new Exception(e.getMessage());
				}
			} else if (nOption == 3) {
				String repairCost;
				int nRepairCost;
				while (true) {
					try {
						System.out.println("Enter a repair cost for this vehicle:");
						repairCost = new Scanner(System.in).nextLine();
						nRepairCost = Integer.parseInt(repairCost);
						if (nRepairCost < 1) {
							System.out.println("------------------------------------------------------------------------");
							System.out.println("Invalid input, please try again!");
							System.out.println("------------------------------------------------------------------------");
						} else break;
					} catch (Exception e) {
						System.out.println("------------------------------------------------------------------------");
						System.out.println("Invalid input, please try again!");
						System.out.println("------------------------------------------------------------------------");
					}
				}
				Entity motorcycle = new Motorcycle(nRepairCost);
				try {
					this.cont.add(motorcycle);
					System.out.println("------------------------------------------------------------------------");
					System.out.println("Vehicle succesfully added to the repair shop!");
					System.out.println("------------------------------------------------------------------------");
					return;
				} catch (Exception e) {
					throw new Exception(e.getMessage());
				}
			} else if (nOption == 4) {
				return;
			} else {
				System.out.println("\nInvalid option, please try again!\n");
			}
		}
	}

	public void removeVehicle() throws Exception {
		int nIndex;
		while (true) {
			System.out.println("Enter the index of the vehicle you want to remove: ");
			String index = new Scanner(System.in).nextLine();
			try {
				nIndex = Integer.parseInt(index);
				break;
			} catch (Exception e) {
				System.out.println("------------------------------------------------------------------------");
				System.out.println("Invalid input, please try again!");
				System.out.println("------------------------------------------------------------------------");
			}
		}

		try {
			this.cont.remove(nIndex);
			System.out.println("------------------------------------------------------------------------");
			System.out.println("Vehicle succesfully removed!");
			System.out.println("------------------------------------------------------------------------");
			return;
		} catch (Exception e) {
			System.out.println("------------------------------------------------------------------------");
			System.out.println(e.getMessage());
			System.out.println("------------------------------------------------------------------------");
		}
	}

	public void displayVehicles() {
		if (this.cont.getVehicles()[0] == null) {
			System.out.println("\nThere are no vehicles to be displayed!\n");
			return;
		}

		System.out.println("\nHere is a list of all the vehicles:");
		System.out.println("------------------------------------------------------------------------");
		for (int i = 0; i < this.cont.getSize(); ++i) {
			if (i != this.cont.getSize() - 1) {
				System.out.println("#" + i + " " + this.cont.getVehicles()[i].toString() + "\n");
			} else {
				System.out.println("#" + i + " " + this.cont.getVehicles()[i].toString());
			}
		}
		System.out.println("------------------------------------------------------------------------");
	}

	public void displayVehicles1000() {
		Entity[] filtered = this.cont.filter();

		if (filtered[0] == null) {
			System.out.println("\nThere are no vehicles with a repair cost greater than 1000RON!\n");
			return;
		}

		System.out.println("\nHere is a list of all the vehicles with a repair cost greater than 1000RON:");
		System.out.println("------------------------------------------------------------------------");
		for (int i = 0; i < filtered.length; ++i) {
			if (filtered[i] != null) {
				if (filtered[i + 1] != null) {
					System.out.println("#" + i + " " + filtered[i].toString() + "\n");
				} else {
					System.out.println("#" + i + " " + filtered[i].toString());
				}
			}
		}
		System.out.println("------------------------------------------------------------------------");
	}

	public void start() throws Exception {
		this.cont.generate();

		System.out.println("\nWelcome to the vehicle repair shop!");
		System.out.println("------------------------------------------------------------------------");

		while (true) {
			printMenu();
			System.out.println("------------------------------------------------------------------------");
			System.out.println("Please select an option:");
			String option = new Scanner(System.in).nextLine();
			switch (option) {
				case "1" -> addVehicle();
				case "2" -> removeVehicle();
				case "3" -> displayVehicles();
				case "4" -> displayVehicles1000();
				case "5" -> {
					System.out.println("Terminating program...");
					return;
				}
				default -> System.out.println("Invalid option!");
			}
		}
	}
}