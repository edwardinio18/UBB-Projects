import random
import csv
import time

from faker import Faker

fake = Faker()


def generate_cigarette_data(num_records):
    start_time = time.time()
    print(f"Generating {num_records} cigarette data records...")
    data = []
    for i in range(num_records):
        cigarette = {
            "id": i + 1,
            "name": fake.word(),
            "price": random.randint(15, 80),
            "origin": fake.country(),
            "photo": fake.image_url(),
            "description": fake.sentence(),
            "brand": random.randint(1, 1000000),
        }
        data.append(cigarette)
    end_time = time.time()
    print(
        f"Finished generating {num_records} cigarette data records in {end_time - start_time:.2f} seconds."
    )
    return data


def generate_brand_data(num_records):
    start_time = time.time()
    print(f"Generating {num_records} brand data records...")
    data = []
    for i in range(num_records):
        brand = {
            "id": i + 1,
            "name": fake.company(),
            "origin": fake.country(),
            "description": fake.sentence(),
            "noCountries": random.randint(1, 100),
            "photo": fake.image_url(),
        }
        data.append(brand)
    end_time = time.time()
    print(
        f"Finished generating {num_records} brand data records in {end_time - start_time:.2f} seconds."
    )
    return data


def generate_person_data(num_records):
    start_time = time.time()
    print(f"Generating {num_records} person data records...")
    data = []
    for i in range(num_records):
        person = {
            "id": i + 1,
            "name": fake.name(),
            "age": random.randint(18, 90),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "address": fake.address(),
        }
        data.append(person)
    end_time = time.time()
    print(
        f"Finished generating {num_records} person data records in {end_time - start_time:.2f} seconds."
    )
    return data


def generate_cigarette_person_data(num_records):
    start_time = time.time()
    print(f"Generating {num_records} cigarette-person data records...")
    data = []
    used_combinations = set()
    while len(data) < num_records:
        cigarette = random.randint(1, 1000000)
        person = random.randint(1, 1000000)
        combination = (cigarette, person)
        if combination not in used_combinations:
            cigarette_person = {
                "cigarette": cigarette,
                "person": person,
                "createdAt": fake.date_time_between(
                    start_date="-1y", end_date="now"
                ).strftime("%Y-%m-%d %H:%M:%S"),
                "updatedAt": fake.date_time_between(
                    start_date="-1y", end_date="now"
                ).strftime("%Y-%m-%d %H:%M:%S"),
            }
            data.append(cigarette_person)
            used_combinations.add(combination)
    end_time = time.time()
    print(
        f"Finished generating {num_records} cigarette-person data records in {end_time - start_time:.2f} seconds."
    )
    return data


def write_to_csv_file(filename, data):
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.DictWriter(
            csvfile, fieldnames=data[0].keys(), delimiter=',')
        writer.writerows(data)


start_total_time = time.time()

cigarette_data = generate_cigarette_data(1000000)
write_to_csv_file(
    "../csvs/cigarette_data.csv", cigarette_data
)

brand_data = generate_brand_data(1000000)
write_to_csv_file("../csvs/brand_data.csv", brand_data)

person_data = generate_person_data(1000000)
write_to_csv_file("../csvs/person_data.csv", person_data)

cigarette_person_data = generate_cigarette_person_data(10000000)
write_to_csv_file(
    "../csvs/cigarette_person_data.csv",
    cigarette_person_data,
)

end_total_time = time.time()
total_time_taken = end_total_time - start_total_time
print(
    f"All data generation and CSV writing complete in {total_time_taken:.2f} seconds."
)
