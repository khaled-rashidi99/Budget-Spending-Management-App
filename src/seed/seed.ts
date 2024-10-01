import seedData from "./seedData.json";

export const seedLocalStorage = () => {
  if (!localStorage.getItem("transactionsState")) {
    localStorage.setItem("transactionsState", JSON.stringify(seedData));
    window.location.reload();
    console.log("Seed data loaded into localStorage");
  }
};
