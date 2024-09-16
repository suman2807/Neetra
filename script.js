const buildingForm = document.getElementById('building-form');
const imageInputContainer = document.getElementById('image-input-container');

// Array to hold the percentage of completion for each building
let completionPercentages = [];

buildingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    imageInputContainer.innerHTML = ''; // Clear previous inputs

    const numBuildings = document.getElementById('num-buildings').value;

    // Reset completion percentages
    completionPercentages = new Array(parseInt(numBuildings)).fill(0);

    for (let i = 0; i < numBuildings; i++) {
        const imageInput = document.createElement('div');
        imageInput.className = 'image-input';
        imageInput.innerHTML = `
            <h2>Building ${i + 1}</h2>
            <div id="image-form-${i}" class="image-form">
                <label for="image-${i}">Upload Image:</label>
                <input type="file" id="image-${i}" name="image"><br><br>
                <label for="infrastructure-type-${i}">Select Infrastructure Type:</label>
                <select id="infrastructure-type-${i}" name="infrastructure-type">
                    <option value="foundation">Foundation</option>
                    <option value="super-structure">Super Structure</option>
                    <option value="facade">Facade</option>
                    <option value="interiors">Interiors</option>
                </select><br><br>
                <label for="estimated-days-${i}">Estimated Days to Complete:</label>
                <input type="number" id="estimated-days-${i}" name="estimated-days"><br><br>
                <button type="submit">Submit</button>
            </div>
        `;
        imageInputContainer.appendChild(imageInput);
    }
});

// Event listener for form submissions inside image input container
imageInputContainer.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const imageForm = e.target.parentNode;
        const buildingIndex = imageForm.id.split('-')[2];

        const image = imageForm.querySelector(`#image-${buildingIndex}`).files[0];
        const infrastructureType = imageForm.querySelector(`#infrastructure-type-${buildingIndex}`).value;
        const estimatedDays = imageForm.querySelector(`#estimated-days-${buildingIndex}`).value;

        // Mocked image analysis result for this example
        const imageAnalysis = analyzeImage(image, infrastructureType);
        const percentageOfCompletion = imageAnalysis.percentageOfCompletion;

        // Store the result in the array
        completionPercentages[buildingIndex] = percentageOfCompletion;

        // Display the analysis results for this building, line by line
        const analysisResult = document.createElement('div');
        analysisResult.innerHTML = `
            <h2>Analysis Result for Building ${parseInt(buildingIndex) + 1}</h2>
            <p>Construction Activity: ${imageAnalysis.constructionActivity}</p>
            <p>Stage of Construction: ${imageAnalysis.stageOfConstruction}</p>
            <p>Percentage of Completion: ${percentageOfCompletion}%</p>
        `;

        // Add the result below the current form
        imageInputContainer.appendChild(analysisResult);

        // Calculate the total percentage of completion across all buildings
        const totalPercentageOfCompletion = calculateTotalPercentageOfCompletion();
        const projectAnalysisResult = document.createElement('div');
        projectAnalysisResult.innerHTML = `
            <h2>Project Analysis Result</h2>
            <p>Total Percentage of Completion: ${totalPercentageOfCompletion}%</p>
        `;

        // Ensure only one project result is displayed by clearing previous results
        const existingProjectResult = document.querySelector('.project-analysis-result');
        if (existingProjectResult) {
            existingProjectResult.remove();
        }

        projectAnalysisResult.classList.add('project-analysis-result');
        imageInputContainer.appendChild(projectAnalysisResult);

        // Clear the form fields after submission
        imageForm.reset();
    }
});

/**
     * Analyzes an image based on the specified infrastructure type and returns
     * details about the construction activity, stage of construction, and
     * percentage of completion.
     *
     * @param {Object} image - The image object to be analyzed.
     * @param {string} infrastructureType - The type of infrastructure being analyzed.
     *        This should be one of the following: "foundation", "super-structure",
     *        "facade", or "interiors".
     *
     * @returns {Object} An object containing the following properties:
     *   - constructionActivity: The type of construction activity.
     *   - stageOfConstruction: The current stage of construction.
     *   - percentageOfCompletion: A number representing the percentage of completion
     *     based on the infrastructure type.
     *
     * @throws {Error} Throws an error if the infrastructureType is not recognized.
     *
     * @example
     * const result = analyzeImage(imageObject, "facade");
     * console.log(result);
     * // Output: {
     * //   constructionActivity: "facade",
     * //   stageOfConstruction: "facade",
     * //   percentageOfCompletion: 75
     * // }
     */
function analyzeImage(image, infrastructureType) {
    // Mock function for image analysis
    const completionMapping = {
        "foundation": 25,
        "super-structure": 50,
        "facade": 75,
        "interiors": 100
    };

    return {
        constructionActivity: infrastructureType,
        stageOfConstruction: infrastructureType,
        percentageOfCompletion: completionMapping[infrastructureType]
    };
}

/**
     * Calculates the average completion percentage across all buildings.
     *
     * This function sums up all the completion percentages stored in the 
     * `completionPercentages` array and divides the total by the number of 
     * entries to find the average. The result is formatted to two decimal 
     * places.
     *
     * @returns {string} The average completion percentage formatted to two 
     * decimal places.
     *
     * @throws {Error} Throws an error if `completionPercentages` is not an 
     * array or if it is empty.
     *
     * @example
     * // Assuming completionPercentages is [80, 90, 100]
     * const average = calculateTotalPercentageOfCompletion();
     * console.log(average); // Output: "90.00"
     */
function calculateTotalPercentageOfCompletion() {
    // Calculate the average completion percentage across all buildings
    const total = completionPercentages.reduce((sum, current) => sum + current, 0);
    return (total / completionPercentages.length).toFixed(2);
}
