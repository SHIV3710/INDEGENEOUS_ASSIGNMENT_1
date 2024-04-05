import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import SinglePaper from "./SinglePaper";
import citeproc from "citeproc"; // Import citeproc library
import { useDispatch } from "react-redux";
import { resultpaper } from "../Redux/Store";

const citationStyles = [
  { value: "apa", label: "APA" },
  { value: "chicago", label: "Chicago" },
  { value: "mla", label: "MLA" },
  // Add more styles as needed
];

const SinglePaperwithCitation = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [citation, setCitation] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(citationStyles[0].value); // Default style
  const dispatch = useDispatch();
  useEffect(() => {
    if (item) {
      // Process citation when component mounts or style changes

      try {
        const processor = new citeproc.Engine({
          lang: "en-US", // Set desired language (optional)
        });

        const bibliography = processor.makeBibliography({
          style: selectedStyle,
          items: [
            {
              id: "paper-citation",
              data: item.citationStyles.bibtex,
            },
          ],
        });
        const formattedCitation =
          bibliography.bibliography[0].citationItems[0].formattedCitation;
        setCitation(formattedCitation);
      } catch (error) {
        console.error("Error processing citation:", error);
      }
    }
  }, [item, selectedStyle]);

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  return (
    <div className="single-paper-with-citation">
      <div className="back-buttons" onClick={() => dispatch(resultpaper(""))}>
        <IoChevronBack /> Back
      </div>
      <SinglePaper item={item} />
      <div className="citation-style-selector">
        <label htmlFor="citation-style">Citation Style:</label>
        <select
          id="citation-style"
          value={selectedStyle}
          onChange={handleStyleChange}
        >
          {citationStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>
      {open && (
        <div className="citation-container">
          {citation && <p dangerouslySetInnerHTML={{ __html: citation }} />}{" "}
          {/* Render formatted citation */}
        </div>
      )}
    </div>
  );
};

export default SinglePaperwithCitation;
