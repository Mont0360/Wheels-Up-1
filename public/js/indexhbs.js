$(document).ready(function () {

    console.log("JS WORKING!");

    $(document).on("click", ".addToDesired", function (event) {
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0, -12);
        console.log(countryName);

        const desiredCountry = {
            country_name: countryName,
            desired: 1
        };

        addToDesired(desiredCountry);

        function addToDesired(countryObj) {
            console.log(countryObj)
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to desired.");
                    location.reload();
                }
            );
        }
    });

    $(document).on("click", ".addToVisited", function (event) {
        event.preventDefault();

        let countryName = $(this).parent().text().slice(0, -11);
        console.log(countryName);

        const visitedCountry = {
            country_name: countryName,
            visited: 1,
            desired: 0
        };

        addToVisited(visitedCountry);

        function addToVisited(countryObj) {
            console.log(countryObj)
            $.ajax({
                method: "PUT",
                url: "/api/visited",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to visited.");
                    location.reload();
                }
            );
        }
    });

    $(document).on("click", ".removeCountry", function (event) {
        event.preventDefault();

        let countryName = $(this).parent().text().slice(0, -8);
        console.log(countryName);

        const removedCountry = {
            country_name: countryName,
            visited: 0
        };

        removeCountry(removedCountry);

        function removeCountry(countryObj) {
            console.log(countryObj)
            $.ajax({
                method: "PUT",
                url: "/api/remove",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " removed.");
                    location.reload();
                }
            );
        }
    });


    $(document).on("click", ".addToDesired", function (event) {
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0, -12);
        console.log(countryName);

        const desiredCountry = {
            country_name: countryName,
            desired: 1
        };

        addToDesired(desiredCountry);

        function addToDesired(countryObj) {
            console.log(countryObj)
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to desired.");
                    location.reload();
                }
            );
        }
    });

    // DISPLAYS COUNTRIES BY THEIR FIRST LETTER (first function explains the rest)

    $(document).on("click", "#startsWithC", function (event) {
        event.preventDefault();

        getAllCountries();

        function letterCfunction() {
            // Clears list of existing countries (if any)
            $("#countriesAtoZ").empty();

            const allCountries = [];

            // Gets all the countries from the db and puts it into array allCountries
            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countriesC = [];

            // Filters through allCountries and puts countries into countriesC if it starts with "C"
            for (var i = 0; i < allCountries.length; i++) {
                if (allCountries[i].country_name.startsWith("C") === true) {

                    countriesC.push(allCountries[i]);
                }
            };

            // Creates a <li> for each country and appends it to the ul
            countriesC.forEach(c => $("#countriesAtoZ").append("<li>" + c.country_name + "</li>"))
        }

        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                console.log(allCountries);
                countries = data;
                letterCfunction();
            });
        }

    });

    $(document).on("click", "#startsWithS", function (event) {
        event.preventDefault();

        getAllCountries();

        function letterSfunction() {

            $("#countriesAtoZ").empty();

            const allCountries = [];

            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countriesS = [];

            for (var i = 0; i < allCountries.length; i++) {
                if (allCountries[i].country_name.startsWith("S") === true) {

                    countriesS.push(allCountries[i]);
                }
            };

            countriesS.forEach(s => $("#countriesAtoZ").append("<li>" + s.country_name + "</li>"))
        }

        // Get request which gets all country data from the db (via the API route)
        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                console.log(allCountries);
                countries = data;
                letterSfunction();
            });
        }

    });

    // DISPLAYS COUNTRIES BY THEIR REGION (first function explains the rest)

    // $(document).on("click", "#regionNorthernAmerica", function (event) {
    //     event.preventDefault();

    //     getAllCountries();

    //     function northernAmerica() {
    //         // Clears list of existing countries (if any)
    //         $("#countriesByRegion").empty();

    //         const allCountries = [];

    //         // Gets all the countries from the db and puts it into array allCountries
    //         for (var i = 0; i < countries.length; i++) {
    //             allCountries.push(countries[i]);
    //         }

    //         const countriesNorthernAmerica = [];

    //         // Filters through allCountries and puts countries into countriesNorthernAmerica if its region is NORTHERN AMERICA
    //         for (var i = 0; i < allCountries.length; i++) {
    //             if (allCountries[i].region === "NORTHERN AMERICA") {

    //                 countriesNorthernAmerica.push(allCountries[i]);
    //             }
    //         };

    //         // Creates a <li> for each country and appends it to the ul
    //         countriesNorthernAmerica.forEach(na => $("#countriesByRegion").append("<li>" + na.country_name + "</li>"))
    //     }

    //     // Get request which gets all country data from the db (via the API route)
    //     function getAllCountries() {
    //         $.get("/api/countries/az", function (data) {
    //             console.log(allCountries);
    //             countries = data;
    //             northernAmerica();
    //         });
    //     }

    // });

    // $(document).on("click", "#regionWesternEurope", function (event) {
    //     event.preventDefault();

    //     getAllCountries();

    //     function westernEurope() {

    //         $("#countriesByRegion").empty();

    //         const allCountries = [];

    //         for (var i = 0; i < countries.length; i++) {
    //             allCountries.push(countries[i]);
    //         }

    //         const countriesWesternEurope = [];

    //         for (var i = 0; i < allCountries.length; i++) {
    //             if (allCountries[i].region === "WESTERN EUROPE") {

    //                 countriesWesternEurope.push(allCountries[i]);
    //             }
    //         };

    //         countriesWesternEurope.forEach(we => $("#countriesByRegion").append("<li>" + we.country_name + "</li>"))
    //     }

    //     function getAllCountries() {
    //         $.get("/api/countries/az", function (data) {
    //             console.log(allCountries);
    //             countries = data;
    //             westernEurope();
    //         });
    //     }

    // });

    ///// TESTING ONE FUNCTION FOR ALL

    $(document).on("click", ".countryRegion", function (event) {
        event.preventDefault();

        let selectedRegion = $(this).html();

        console.log(selectedRegion);

        getAllCountries();

        function displayByRegion() {

            $("#countriesByRegion").empty();

            const allCountries = [];

            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countriesOfChosenRegion = [];

            for (var i = 0; i < allCountries.length; i++) {
                if (allCountries[i].region === selectedRegion) {

                    countriesOfChosenRegion.push(allCountries[i]);
                }
            };

            countriesOfChosenRegion.forEach(region => $("#countriesByRegion").append("<li>" + region.country_name + "</li>"))
        }

        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                console.log(allCountries);
                countries = data;
                displayByRegion();
            });
        }

    });






});
