
import React from "react";

import { render, fireEvent, wait } from "@testing-library/react";

import { getData as mockGetData } from "../api";

import StarWarsCharacters from "./StarWarsCharacters";


jest.mock("../api");

test("Should render character list and buttons for next and previous", async () => {
  mockGetData.mockResolvedValueOnce({
    results: [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
      }
    ],
    next: "abcd",
    previous: "abcde"
  });

  const { getByText } = render(<StarWarsCharacters />);

  const nextButton = getByText(/next/i);
  
  const prevButton = getByText(/previous/i);

  fireEvent.click(nextButton);
  fireEvent.click(prevButton);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => expect(getByText(/luke/i)));
});