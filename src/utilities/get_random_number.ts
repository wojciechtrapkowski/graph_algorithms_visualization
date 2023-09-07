'use client';

export function getRandomNumber(min: number, max: number): number {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const random = Math.random();
  
    // Scale the random number to fit within the desired range
    const scaledRandom = random * (max - min);
  
    // Shift the scaled random number to the desired range
    const result = scaledRandom + min;
  
    return Math.floor(result);
}