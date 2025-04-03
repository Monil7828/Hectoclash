export const generateProblem = () => {
    const numbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9) + 1);
    return numbers.join(" "); // Convert array to a string (e.g., "3 1 3 7 1 9")
};
