## Dashboard pack setup for CBT product:

### Step 1:

On the following filepath:

```
Frontend/view/common/twig/dashBoardReport.tpl
```

Add the div element

```
<div id="root"></div>
```

Which is present under dashBoardController ng-controller


### Step 2:

On the following filepath:

```
lib/script/angular/controller/application/main.js

```

Add the following code of:

```
$scope.loadHomePage = function () {
        var defaultModuleName = $('#defaultModuleName').val();
        var homePageModule = (typeof defaultModuleName !== 'undefined' && defaultModuleName !== '') 
            ? '/' + defaultModuleName 
            : '/ZGFzaEJvYXJRVU1vZDg=';
    
        // Navigate to the module
        $state.go(homePageModule, {}, { reload: true });
    
        // Wait for Angular to load the template before proceeding
        $timeout(function waitForRoot() {
            const reactContainer = document.getElementById('root');
    
            if (!reactContainer) {
                console.warn("Waiting for #root to be available...");
                $timeout(waitForRoot, 100); // Check again after 100ms
                return;
            }
    
            console.log("#root found! Initializing React...");
    
            function initializeReactApp() {
                if (window.ReactApp && window.ReactApp.init) {
                    window.ReactApp.init(reactContainer, $scope.reactData);
                } else {
                    console.error("ReactApp is not defined after loading script.");
                }
            }
    
            // If React is already loaded, initialize immediately
            if (window.ReactApp && window.ReactApp.init) {
                initializeReactApp();
                return;
            }
    
            // Load React dynamically if not already loaded
            var script = document.createElement('script');
            script.src = "lib/script/dashboard/index.js"; // Update with actual React bundle path
            script.onload = function () {
                console.log("React script loaded successfully.");
                initializeReactApp();
            };
            script.onerror = function () {
                console.error("Failed to load React script.");
            };
    
            document.body.appendChild(script);
        }, 100);
    };

```

### Step 3:

Need to add the add the package css to common.css

On the following file:

```
lib/css/common/common.css
```

### Step 4:

Add the dashboard build, css and js file to mentioned file path:

```
FrontEnd/lib/script/dashboard/index.js
```