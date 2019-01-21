(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("../templates");
var utils_1 = require("../utils/utils");
function Component(options) {
    return function (target) {
        target.selector = utils_1.Utils.kababCaseToCamelCase(options.selector);
        if (options.template) {
            target.template = options.template;
        }
        else if (options.templateUrl) {
            options.template = '';
            target.template = templates_1.Templates[options.templateUrl];
        }
        target.$ctrl = target.prototype;
        target.controller = target;
        target.$inject = options.providers ? options.providers.map(function (dep) { return dep.name || dep.toString(); }) : [];
        target.transclude = options.transclude ? options.transclude : false;
        target.restrict = options.restrict ? options.restrict : 'E';
        target.type = 'component';
    };
}
exports.Component = Component;

},{"../templates":12,"../utils/utils":13}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Injectable() {
    return function (target) {
    };
}
exports.Injectable = Injectable;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils/utils");
function NgModule(options) {
    return function (target) {
        // Change the module name to camel case
        var modulename = utils_1.Utils.camelCase(target.name);
        // Map all other imported module names to strings
        var imports = options.imports ? options.imports.map(function (mod) { return utils_1.Utils.camelCase(mod.name); }) : [];
        // Create and register the module along with its imported modules
        target = angular.module(modulename, imports);
        // Register all services to this module
        var providers = options.providers ? options.providers : [];
        for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
            var provider = providers_1[_i];
            target.service(provider.name, provider);
        }
        // Register all directives and components to this module
        var declarations = options.declarations ? options.declarations : [];
        for (var _a = 0, declarations_1 = declarations; _a < declarations_1.length; _a++) {
            var dec = declarations_1[_a];
            var decname = utils_1.Utils.camelCase(dec.selector);
            if (dec.type === 'component') {
                target.component(decname, dec);
            }
            else if (dec.type === 'directive') {
                target.directive(decname, dec);
            }
        }
        // TODO: insert the bootstrapped components?
        // for(let comp of options.bootstrap) {
        //   let selector = Utils.kababCase(comp.selector);
        //   let elStr = `<${selector}></${selector}>`;
        //   let el = angular.element(elStr);
        //   angular.element(document.body).append(el);
        //   angular.element(el).scope().$apply();      
        // }
    };
}
exports.NgModule = NgModule;

},{"../utils/utils":13}],4:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_annotation_1 = require("./annotations/component.annotation");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        component_annotation_1.Component({
            selector: 'app-component',
            templateUrl: './app/app.component.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

},{"./annotations/component.annotation":1}],5:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_annotation_1 = require("./annotations/module.annotation");
var app_component_1 = require("./app.component");
var toolbox_view_module_1 = require("./components/toolbox-view/toolbox-view.module");
var http_request_service_1 = require("./services/http-request.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        module_annotation_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                http_request_service_1.HttpRequestService
            ],
            imports: [
                toolbox_view_module_1.ToolboxViewModule
            ],
            bootstrap: [app_component_1.AppComponent] //TODO: this is not currently doing anything. still a manual process to put it into the index.html
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

},{"./annotations/module.annotation":3,"./app.component":4,"./components/toolbox-view/toolbox-view.module":8,"./services/http-request.service":11}],6:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_annotation_1 = require("../../../annotations/component.annotation");
var ToolComponent = /** @class */ (function () {
    function ToolComponent($scope) {
        this.$scope = $scope;
        this.name = '';
        this.price = null;
        this.desc = '';
        this.quant = 1;
    }
    ToolComponent.prototype.$onInit = function () {
        // Called when the component is initialized
    };
    ToolComponent.prototype.removeTool = function () {
        this.$scope.$emit('removeTool', this.$scope);
    };
    ToolComponent.prototype.$onDestroy = function () {
        // Called before component is destroyed  
    };
    ToolComponent = __decorate([
        component_annotation_1.Component({
            selector: 'tool',
            templateUrl: './app/components/toolbox-view/tool/tool.component.html',
            providers: ['$scope']
        })
    ], ToolComponent);
    return ToolComponent;
}());
exports.ToolComponent = ToolComponent;

},{"../../../annotations/component.annotation":1}],7:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_annotation_1 = require("../../annotations/component.annotation");
var tool_component_1 = require("./tool/tool.component");
var dynamic_component_factory_service_1 = require("../../services/dynamic-component-factory.service");
var ToolboxViewComponent = /** @class */ (function () {
    function ToolboxViewComponent($scope, $element, dcfs) {
        this.$scope = $scope;
        this.$element = $element;
        this.dcfs = dcfs;
        this.allTools = [
            {
                name: 'Hammer',
                price: 4.99,
                desc: "This durable grip hammer has a fiberglass handle to absorb impact and relieve arm strain. Won't crack or splinter. The drop forged polished steel head features a claw that enables you to remove nails with ease and a fiberglass handle that provides a comfortable, shock-absorbing grip.",
                component: tool_component_1.ToolComponent
            },
            {
                name: 'Wrench',
                price: 14.99,
                desc: "This 15 in. adjustable wrench is extra-long so you can tackle especially tough fasteners. Featuring a carbon steel construction and a rugged I-beam handle, this adjustable wrench is made for handling big jobs. The jaw design allows for greater strength and a better fit.",
                component: tool_component_1.ToolComponent
            },
        ];
        this.toolBox = [];
        this.selectedTool = this.allTools[0];
    }
    ToolboxViewComponent.prototype.addTool = function (toolSelection) {
        var _this = this;
        var locationInToolbox = this.toolBox.map(function (tool) { return tool.option; }).indexOf(toolSelection);
        if (locationInToolbox < 0) {
            var compRef_1 = this.dcfs.createComponent(toolSelection.component, this.$scope);
            this.$element.append(compRef_1.component);
            compRef_1.controller.name = toolSelection.name;
            compRef_1.controller.price = toolSelection.price;
            compRef_1.controller.desc = toolSelection.desc;
            compRef_1.newScope.$on('removeTool', function (event, data) {
                var compref = _this.toolBox.filter(function (tool) { return tool.comp.newScope === data; });
                _this.removeOneTool(compRef_1);
            });
            this.toolBox.push({ option: toolSelection, comp: compRef_1 });
        }
        else {
            this.toolBox[locationInToolbox].comp.controller.quant++;
        }
    };
    ToolboxViewComponent.prototype.removeOneTool = function (tool) {
        if (tool != null) {
            var locationInToolbox = this.toolBox.map(function (tool) { return tool.comp; }).indexOf(tool);
            if (locationInToolbox > -1) {
                var ctrl = this.toolBox[locationInToolbox].comp.controller;
                if (ctrl.quant > 1) {
                    ctrl.quant--;
                }
                else {
                    this.dcfs.removeComponent(tool);
                    this.toolBox.splice(locationInToolbox, 1);
                }
            }
        }
    };
    ToolboxViewComponent.prototype.removeTools = function () {
        for (var _i = 0, _a = this.toolBox; _i < _a.length; _i++) {
            var tool = _a[_i];
            this.dcfs.removeComponent(tool.comp);
        }
        this.toolBox.splice(0);
    };
    Object.defineProperty(ToolboxViewComponent.prototype, "totalCostOfTools", {
        get: function () {
            return this.toolBox.length > 0 ? Math.round(this.toolBox
                .map(function (tool) { return tool.comp.controller.price * tool.comp.controller.quant; })
                .reduce(function (prev, current) { return prev + current; }) * 100) / 100 : 0;
        },
        enumerable: true,
        configurable: true
    });
    ToolboxViewComponent = __decorate([
        component_annotation_1.Component({
            selector: 'toolbox-view',
            templateUrl: './app/components/toolbox-view/toolbox-view.component.html',
            providers: ['$scope', '$element', dynamic_component_factory_service_1.DynamicComponentFactoryService]
        })
    ], ToolboxViewComponent);
    return ToolboxViewComponent;
}());
exports.ToolboxViewComponent = ToolboxViewComponent;

},{"../../annotations/component.annotation":1,"../../services/dynamic-component-factory.service":10,"./tool/tool.component":6}],8:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_annotation_1 = require("../../annotations/module.annotation");
var tool_component_1 = require("./tool/tool.component");
var toolbox_view_component_1 = require("./toolbox-view.component");
var dynamic_component_factory_service_1 = require("../../services/dynamic-component-factory.service");
var ToolboxViewModule = /** @class */ (function () {
    function ToolboxViewModule() {
    }
    ToolboxViewModule = __decorate([
        module_annotation_1.NgModule({
            declarations: [
                toolbox_view_component_1.ToolboxViewComponent,
                tool_component_1.ToolComponent
            ],
            providers: [
                dynamic_component_factory_service_1.DynamicComponentFactoryService
            ],
            exports: [
                toolbox_view_component_1.ToolboxViewComponent,
                tool_component_1.ToolComponent
            ]
        })
    ], ToolboxViewModule);
    return ToolboxViewModule;
}());
exports.ToolboxViewModule = ToolboxViewModule;

},{"../../annotations/module.annotation":3,"../../services/dynamic-component-factory.service":10,"./tool/tool.component":6,"./toolbox-view.component":7}],9:[function(require,module,exports){
"use strict";
/// <reference types="angular" />
Object.defineProperty(exports, "__esModule", { value: true });
var app_module_1 = require("./app.module");
new app_module_1.AppModule();

},{"./app.module":5}],10:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var injectable_annotation_1 = require("../annotations/injectable.annotation");
var utils_1 = require("../utils/utils");
var DynamicComponentFactoryService = /** @class */ (function () {
    function DynamicComponentFactoryService($compile) {
        this.$compile = $compile;
    }
    DynamicComponentFactoryService.prototype.createComponent = function (component, parentScope) {
        var selector = utils_1.Utils.kababCase(component.selector);
        var elStr = "<" + selector + "></" + selector + ">";
        var el = angular.element(elStr);
        var scope = parentScope.$new();
        var comp = this.$compile(el)(scope);
        var ctrl = comp.controller(selector);
        return { component: el, newScope: scope, controller: ctrl };
    };
    DynamicComponentFactoryService.prototype.removeComponent = function (compRef) {
        compRef.newScope.$destroy();
        compRef.component.remove();
        compRef.newScope.$apply();
    };
    DynamicComponentFactoryService = __decorate([
        injectable_annotation_1.Injectable()
    ], DynamicComponentFactoryService);
    return DynamicComponentFactoryService;
}());
exports.DynamicComponentFactoryService = DynamicComponentFactoryService;

},{"../annotations/injectable.annotation":2,"../utils/utils":13}],11:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var injectable_annotation_1 = require("../annotations/injectable.annotation");
var HttpRequestService = /** @class */ (function () {
    function HttpRequestService($http) {
        this.$http = $http;
    }
    HttpRequestService.prototype.loadTemplate = function (url) {
        return this.$http.get(url, { responseType: 'text/html' });
        // return angular.injector(['ng']).get('$http').get(url, {responseType: 'text/html'});
    };
    HttpRequestService = __decorate([
        injectable_annotation_1.Injectable()
    ], HttpRequestService);
    return HttpRequestService;
}());
exports.HttpRequestService = HttpRequestService;

},{"../annotations/injectable.annotation":2}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = { "./app/app.component.html": "<h2>AppComponent Toolbox</h2>\r\n<toolbox-view></toolbox-view>", "./app/components/toolbox-view/tool/tool.component.html": "<div class=\"card w-4\">\r\n  <div class=\"card-heading\">\r\n    {{$ctrl.name}} - ${{$ctrl.price}} ({{$ctrl.quant}})<button ng-click=\"$ctrl.removeTool()\" class=\"button\" style=\"float: right\">X</button>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    {{$ctrl.desc}}\r\n  </div>\r\n</div>", "./app/components/toolbox-view/toolbox-view.component.html": "<div>Tool Box Items ({{$ctrl.toolBox.length}}) ${{$ctrl.totalCostOfTools}}</div>\r\n<hr>\r\n<div>\r\n<select ng-model=\"$ctrl.selectedTool\" ng-options=\"tool.name for tool in $ctrl.allTools\">\r\n</select>\r\n</div>\r\n<div>\r\n  <button ng-click=\"$ctrl.addTool($ctrl.selectedTool)\" class=\"button button-primary\">Add Tool</button>\r\n  <button ng-click=\"$ctrl.removeTools()\" class=\"button button-danger\">Remove All Tools</button>\r\n</div>\r\n<br>" };

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.camelCase = function (input) {
        var split = input.split('');
        split[0] = split[0].toLowerCase();
        return split.join('');
    };
    Utils.kababCase = function (input) {
        var split = input.split('');
        var out = '';
        for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
            var char = split_1[_i];
            if (char === char.toUpperCase()) {
                out += '-';
            }
            char = char.toLowerCase();
            out += char;
        }
        return out;
    };
    Utils.kababCaseToCamelCase = function (input) {
        return input.toLowerCase().replace(/-(\w)/ig, function ($0, $1) { return $1.toUpperCase(); });
    };
    return Utils;
}());
exports.Utils = Utils;

},{}]},{},[9]);
