var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("templates", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Templates = { "app.component.html": "<h2>AppComponent Toolbox</h2>\r\n<toolbox-view></toolbox-view>", "confirm-dialog.component.html": "<div class=\"card\">\r\n  <div class=\"card-heading\">\r\n    {{$ctrl.options.title}}\r\n  </div>\r\n  <div class=\"card-body\">\r\n    {{$ctrl.options.message}}\r\n  </div>\r\n  <div class=\"card-footer flex-right\">\r\n      <button class=\"button button-success\" ng-click=\"$ctrl.confirm()\">Yes</button> <button class=\"button button-danger\" ng-click=\"$ctrl.deny()\">No</button>\r\n  </div>\r\n</div>", "dialog.component.html": "", "tool.component.html": "<div class=\"card\">\r\n  <div class=\"card-heading\">\r\n    {{$ctrl.model.name}} - ${{$ctrl.model.price}} ({{$ctrl.quant}})<button ng-click=\"$ctrl.removeTool()\" class=\"button\" style=\"float: right\">X</button>\r\n  </div>\r\n  <div class=\"card-body\">\r\n    {{$ctrl.model.desc}}\r\n  </div>\r\n</div>", "toolbox-view.component.html": "<div>Tool Box Items ({{$ctrl.toolBox.length}}) ${{$ctrl.totalCostOfTools}}</div>\r\n<hr>\r\n<div>\r\n<select ng-model=\"$ctrl.selectedTool\" ng-options=\"tool.name for tool in $ctrl.allTools\">\r\n</select>\r\n</div>\r\n<div>\r\n  <button ng-click=\"$ctrl.addTool($ctrl.selectedTool)\" class=\"button button-primary\">Add Tool</button>\r\n  <button ng-click=\"$ctrl.removeTools()\" class=\"button button-danger\">Remove All Tools</button>\r\n</div>\r\n<br>\r\n<div class=\"toolsList\">\r\n    <tool ng-repeat=\"tool in $ctrl.toolBox\" model=\"tool\"></tool>\r\n</div>" };
});
define("stylesheets", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stylesheets = { "confirm-dialog.component.css": "confirm-dialog {\r\n  max-width: 70vw;\r\n  max-height: 70vh;\r\n  position: fixed;\r\n}\r\nconfirm-dialog .card > .card-body {\r\n  overflow: auto;\r\n  max-height: 70vh;\r\n}\r\nconfirm-dialog .card > .card-footer > * {\r\n  margin: auto 5px;\r\n}", "dialog.component.css": "#modal-dialog.modal-dialog-backdrop {\r\n  position: absolute;\r\n  left:0;\r\n  right:0;\r\n  top: 0;\r\n  bottom: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  -moz-animation: fade 0.2s ease-in;\r\n  -ms-animation: fade 0.2s ease-in;\r\n  -webkit-animation: fade 0.2s ease-in;\r\n  -o-animation: fade 0.2s ease-in;\r\n  animation: fade 0.2s ease-in;\r\n  animation-fill-mode: forwards;\r\n}\r\n@keyframes fade {\r\n  from {\r\n    background-color: rgba(0,0,0,0.0);\r\n  }\r\n\r\n  to {\r\n    background-color: rgba(0,0,0,0.5);\r\n  }\r\n}", "tool.component.css": "tool {\r\n  display: inline-block;\r\n}", "toolbox-view.component.css": "toolbox-view .toolsList {\r\n  display: grid;\r\n  grid-template-columns: repeat(2, 1fr);\r\n}" };
});
define("utils/utils", ["require", "exports"], function (require, exports) {
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
            return input.replace(/-(\w)/ig, function ($0, $1) { return $1.toUpperCase(); });
        };
        return Utils;
    }());
    exports.Utils = Utils;
});
define("decorators/directive.decorator", ["require", "exports", "utils/utils", "templates"], function (require, exports, utils_1, templates_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Directive(options) {
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
            if (options && options.providers) {
                target.$inject = options.providers.map(function (dep) { return dep.name || dep.toString(); });
            }
            target.transclude = options.transclude ? options.transclude : false;
            target.restrict = options.restrict ? options.restrict : 'EA';
            target.link = options.link || function (scope, elem, attrs) { };
            target.type = 'directive';
        };
    }
    exports.Directive = Directive;
});
define("decorators/component.decorator", ["require", "exports", "templates", "stylesheets", "utils/utils"], function (require, exports, templates_2, stylesheets_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Component(options) {
        return function (target) {
            target.selector = utils_2.Utils.kababCaseToCamelCase(options.selector);
            if (options.template) {
                target.template = options.template;
            }
            else if (options.templateUrl) {
                options.template = '';
                target.template = templates_2.Templates[options.templateUrl];
            }
            if (options.stylesUrl) {
                var origInit_1 = target.prototype.$onInit;
                var styleEl_1 = angular.element("<style>" + stylesheets_1.Stylesheets[options.stylesUrl] + "</style>");
                target.prototype.$onInit = function () {
                    angular.element(document.head).append(styleEl_1);
                    if (typeof origInit_1 === 'function') {
                        origInit_1.call(target.prototype);
                    }
                };
                var origDestroy_1 = target.prototype.$onDestroy;
                target.prototype.$onDestroy = function () {
                    var numRemainingElements = document.querySelectorAll(options.selector).length;
                    if (numRemainingElements === 1) {
                        angular.element(styleEl_1).remove();
                        if (typeof origDestroy_1 === 'function') {
                            origDestroy_1.call(target.prototype);
                        }
                    }
                };
            }
            target.$ctrl = target.prototype;
            target.controller = target;
            target.bindings = Object.assign({}, target.prototype.bindings);
            if (options && options.providers) {
                target.$inject = options.providers.map(function (dep) { return dep.name || dep.toString(); });
            }
            target.transclude = options.transclude ? options.transclude : false;
            target.restrict = options.restrict ? options.restrict : 'E';
            target.type = 'component';
        };
    }
    exports.Component = Component;
});
define("app.component", ["require", "exports", "decorators/component.decorator"], function (require, exports, component_decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppComponent = /** @class */ (function () {
        function AppComponent() {
        }
        AppComponent = __decorate([
            component_decorator_1.Component({
                selector: 'app-component',
                templateUrl: 'app.component.html'
            }),
            __metadata("design:paramtypes", [])
        ], AppComponent);
        return AppComponent;
    }());
    exports.AppComponent = AppComponent;
});
define("decorators/module.decorator", ["require", "exports", "utils/utils"], function (require, exports, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function NgModule(options) {
        return function (target) {
            // Change the module name to camel case
            var modulename = utils_3.Utils.camelCase(target.name);
            // Map all other imported module names to strings
            var imports = options.imports ? options.imports.map(function (mod) { return utils_3.Utils.camelCase(mod.name); }) : [];
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
                var decname = utils_3.Utils.camelCase(dec.selector);
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
});
define("decorators/injectable.decorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Injectable(options) {
        return function (target) {
            if (options && options.providers) {
                target.$inject = options.providers.map(function (prov) { return prov.name; });
            }
        };
    }
    exports.Injectable = Injectable;
});
define("decorators/input.decorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Input(type) {
        return function (target, key) {
            if (target.bindings == null) {
                target.bindings = {};
            }
            target.bindings[key] = type;
        };
    }
    exports.Input = Input;
});
define("decorators/viewchild.decorator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ViewChild(varname, options) {
        return function (target, key) {
            var origInit = target.$onInit;
            target.$onInit = function () {
                var el = document.querySelector('[templateId=' + varname + ']');
                var returnValue;
                if (options && options.readAs) {
                    switch (options.readAs) {
                        case 'JQLite':
                            returnValue = angular.element(el);
                            break;
                        default:
                            returnValue = el;
                            break;
                    }
                }
                else {
                    returnValue = el;
                }
                target[key] = returnValue;
                if (typeof origInit === 'function') {
                    origInit.call(target);
                }
            };
        };
    }
    exports.ViewChild = ViewChild;
});
define("decorators/index", ["require", "exports", "decorators/component.decorator", "decorators/directive.decorator", "decorators/injectable.decorator", "decorators/input.decorator", "decorators/module.decorator", "decorators/viewchild.decorator"], function (require, exports, component_decorator_2, directive_decorator_1, injectable_decorator_1, input_decorator_1, module_decorator_1, viewchild_decorator_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(component_decorator_2);
    __export(directive_decorator_1);
    __export(injectable_decorator_1);
    __export(input_decorator_1);
    __export(module_decorator_1);
    __export(viewchild_decorator_1);
});
define("services/dynamic-component-factory.service", ["require", "exports", "decorators/injectable.decorator", "utils/utils"], function (require, exports, injectable_decorator_2, utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DynamicComponentFactoryService = /** @class */ (function () {
        function DynamicComponentFactoryService($compile) {
            this.$compile = $compile;
        }
        DynamicComponentFactoryService.prototype.createComponent = function (component, parentScope) {
            var selector = utils_4.Utils.kababCase(component.selector);
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
            injectable_decorator_2.Injectable(),
            __metadata("design:paramtypes", [Function])
        ], DynamicComponentFactoryService);
        return DynamicComponentFactoryService;
    }());
    exports.DynamicComponentFactoryService = DynamicComponentFactoryService;
});
define("components/dialog/confirm-dialog/confirm-dialog.component", ["require", "exports", "decorators/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfirmDialogComponent = /** @class */ (function () {
        function ConfirmDialogComponent($scope) {
            this.$scope = $scope;
        }
        ConfirmDialogComponent.prototype.getScope = function () {
            return this.$scope;
        };
        ConfirmDialogComponent.prototype.confirm = function () {
            this.$scope.$emit('choice', true);
        };
        ConfirmDialogComponent.prototype.deny = function () {
            this.$scope.$emit('choice', false);
        };
        __decorate([
            index_1.Input('<'),
            __metadata("design:type", Object)
        ], ConfirmDialogComponent.prototype, "options", void 0);
        ConfirmDialogComponent = __decorate([
            index_1.Component({
                selector: 'confirm-dialog',
                templateUrl: 'confirm-dialog.component.html',
                stylesUrl: 'confirm-dialog.component.css'
            }),
            __metadata("design:paramtypes", [Object])
        ], ConfirmDialogComponent);
        return ConfirmDialogComponent;
    }());
    exports.ConfirmDialogComponent = ConfirmDialogComponent;
});
define("components/dialog/dialog.component", ["require", "exports", "decorators/index"], function (require, exports, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DialogComponent = /** @class */ (function () {
        function DialogComponent() {
        }
        DialogComponent.prototype.$onInit = function () {
        };
        __decorate([
            index_2.ViewChild('dialog', { readAs: 'JQLite' }),
            __metadata("design:type", Object)
        ], DialogComponent.prototype, "dialogRef", void 0);
        DialogComponent = __decorate([
            index_2.Component({
                selector: 'modal-dialog',
                templateUrl: 'dialog.component.html',
                stylesUrl: 'dialog.component.css'
            }),
            __metadata("design:paramtypes", [])
        ], DialogComponent);
        return DialogComponent;
    }());
    exports.DialogComponent = DialogComponent;
});
define("components/dialog/modal-dialog.service", ["require", "exports", "decorators/index", "services/dynamic-component-factory.service", "components/dialog/dialog.component"], function (require, exports, index_3, dynamic_component_factory_service_1, dialog_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModalDialogService = /** @class */ (function () {
        function ModalDialogService(dcfs) {
            this.dcfs = dcfs;
        }
        ModalDialogService.prototype.createDialog = function (component, $scope, options) {
            if (this.currentDialog) {
                angular.element(this.currentDialog.component).remove();
            }
            var dialog = this.dcfs.createComponent(dialog_component_1.DialogComponent, $scope);
            var compref = this.dcfs.createComponent(component, $scope);
            dialog.component.attr('id', 'modal-dialog');
            dialog.component.addClass('dialog');
            dialog.component.addClass('modal-dialog-backdrop');
            angular.element(dialog.component).append(compref.component);
            angular.element(document.body).append(dialog.component);
            this.currentDialog = dialog;
            return compref;
        };
        ModalDialogService.prototype.destroyDialog = function () {
            if (this.currentDialog) {
                this.dcfs.removeComponent(this.currentDialog);
                this.currentDialog = null;
            }
        };
        ModalDialogService = __decorate([
            index_3.Injectable({
                providers: [dynamic_component_factory_service_1.DynamicComponentFactoryService]
            }),
            __metadata("design:paramtypes", [dynamic_component_factory_service_1.DynamicComponentFactoryService])
        ], ModalDialogService);
        return ModalDialogService;
    }());
    exports.ModalDialogService = ModalDialogService;
});
define("components/dialog/dialog.module", ["require", "exports", "decorators/index", "services/dynamic-component-factory.service", "components/dialog/confirm-dialog/confirm-dialog.component", "components/dialog/dialog.component", "components/dialog/modal-dialog.service"], function (require, exports, index_4, dynamic_component_factory_service_2, confirm_dialog_component_1, dialog_component_2, modal_dialog_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DialogModule = /** @class */ (function () {
        function DialogModule() {
        }
        DialogModule = __decorate([
            index_4.NgModule({
                declarations: [
                    dialog_component_2.DialogComponent,
                    confirm_dialog_component_1.ConfirmDialogComponent
                ],
                providers: [
                    dynamic_component_factory_service_2.DynamicComponentFactoryService,
                    modal_dialog_service_1.ModalDialogService
                ],
                exports: [
                    dialog_component_2.DialogComponent,
                    confirm_dialog_component_1.ConfirmDialogComponent,
                    modal_dialog_service_1.ModalDialogService
                ]
            })
        ], DialogModule);
        return DialogModule;
    }());
    exports.DialogModule = DialogModule;
});
define("components/toolbox-view/tool/tool.model", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/toolbox-view/tool/tool.component", ["require", "exports", "decorators/component.decorator", "decorators/input.decorator"], function (require, exports, component_decorator_3, input_decorator_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolComponent = /** @class */ (function () {
        function ToolComponent($scope) {
            this.$scope = $scope;
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
        __decorate([
            input_decorator_2.Input('<'),
            __metadata("design:type", Object)
        ], ToolComponent.prototype, "model", void 0);
        ToolComponent = __decorate([
            component_decorator_3.Component({
                selector: 'tool',
                templateUrl: 'tool.component.html',
                stylesUrl: 'tool.component.css',
                providers: ['$scope']
            }),
            __metadata("design:paramtypes", [Object])
        ], ToolComponent);
        return ToolComponent;
    }());
    exports.ToolComponent = ToolComponent;
});
define("components/toolbox-view/toolbox-view.component", ["require", "exports", "decorators/component.decorator", "components/dialog/modal-dialog.service", "components/dialog/confirm-dialog/confirm-dialog.component"], function (require, exports, component_decorator_4, modal_dialog_service_2, confirm_dialog_component_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolboxViewComponent = /** @class */ (function () {
        function ToolboxViewComponent($scope, dialogService) {
            this.$scope = $scope;
            this.dialogService = dialogService;
            this.allTools = [
                {
                    name: 'Hammer',
                    price: 4.99,
                    desc: "This durable grip hammer has a fiberglass handle to absorb impact and relieve arm strain. Won't crack or splinter. The drop forged polished steel head features a claw that enables you to remove nails with ease and a fiberglass handle that provides a comfortable, shock-absorbing grip."
                },
                {
                    name: 'Wrench',
                    price: 14.99,
                    desc: "This 15 in. adjustable wrench is extra-long so you can tackle especially tough fasteners. Featuring a carbon steel construction and a rugged I-beam handle, this adjustable wrench is made for handling big jobs. The jaw design allows for greater strength and a better fit."
                },
                {
                    name: 'Phillips Screwdriver',
                    price: 1.69,
                    desc: "This durable Phillips screwdriver is a staple for any toolbox. The chrome vanadium steel construction is rugged enough for even the most stubborn screws and a textured TPR grip handle provides plenty of control and comfort."
                }
            ];
            this.toolBox = [];
            this.selectedTool = this.allTools[0];
        }
        ToolboxViewComponent.prototype.$onInit = function () {
        };
        ToolboxViewComponent.prototype.addTool = function (toolSelection) {
            var locationInToolbox = this.toolBox.indexOf(toolSelection);
            if (locationInToolbox < 0) {
                this.toolBox.push(toolSelection);
            }
        };
        ToolboxViewComponent.prototype.removeOneTool = function (tool) {
            if (tool != null) {
                var locationInToolbox = this.toolBox.indexOf(tool);
                if (locationInToolbox > -1) {
                    this.toolBox.splice(locationInToolbox, 1);
                }
            }
        };
        ToolboxViewComponent.prototype.removeTools = function () {
            var _this = this;
            var ref = this.dialogService.createDialog(confirm_dialog_component_2.ConfirmDialogComponent, this.$scope);
            ref.controller.options = { title: 'Hold up!', message: 'Are you sure you want to empty the toolbox?' };
            ref.controller.getScope().$on('choice', function (event, data) {
                if (data) {
                    _this.toolBox.splice(0);
                }
                _this.dialogService.destroyDialog();
            });
        };
        Object.defineProperty(ToolboxViewComponent.prototype, "totalCostOfTools", {
            get: function () {
                return this.toolBox.length > 0 ? Math.round(this.toolBox
                    .map(function (tool) { return tool.price; })
                    .reduce(function (prev, current) { return prev + current; }) * 100) / 100 : 0;
            },
            enumerable: true,
            configurable: true
        });
        ToolboxViewComponent = __decorate([
            component_decorator_4.Component({
                selector: 'toolbox-view',
                templateUrl: 'toolbox-view.component.html',
                stylesUrl: 'toolbox-view.component.css',
                providers: ['$scope', modal_dialog_service_2.ModalDialogService]
            }),
            __metadata("design:paramtypes", [Object, modal_dialog_service_2.ModalDialogService])
        ], ToolboxViewComponent);
        return ToolboxViewComponent;
    }());
    exports.ToolboxViewComponent = ToolboxViewComponent;
});
define("components/toolbox-view/toolbox-view.module", ["require", "exports", "decorators/module.decorator", "components/dialog/dialog.module", "components/toolbox-view/tool/tool.component", "components/toolbox-view/toolbox-view.component"], function (require, exports, module_decorator_2, dialog_module_1, tool_component_1, toolbox_view_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolboxViewModule = /** @class */ (function () {
        function ToolboxViewModule() {
        }
        ToolboxViewModule = __decorate([
            module_decorator_2.NgModule({
                declarations: [
                    toolbox_view_component_1.ToolboxViewComponent,
                    tool_component_1.ToolComponent,
                ],
                providers: [],
                imports: [
                    dialog_module_1.DialogModule
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
});
define("services/http-request.service", ["require", "exports", "decorators/injectable.decorator"], function (require, exports, injectable_decorator_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HttpRequestService = /** @class */ (function () {
        function HttpRequestService($http) {
            this.$http = $http;
        }
        HttpRequestService.prototype.loadTemplate = function (url) {
            return this.$http.get(url, { responseType: 'text/html' });
            // return angular.injector(['ng']).get('$http').get(url, {responseType: 'text/html'});
        };
        HttpRequestService = __decorate([
            injectable_decorator_3.Injectable(),
            __metadata("design:paramtypes", [Function])
        ], HttpRequestService);
        return HttpRequestService;
    }());
    exports.HttpRequestService = HttpRequestService;
});
define("directives/template-id.directive", ["require", "exports", "decorators/directive.decorator"], function (require, exports, directive_decorator_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TemplateIdDirective = /** @class */ (function () {
        function TemplateIdDirective($scope) {
        }
        TemplateIdDirective = __decorate([
            directive_decorator_2.Directive({
                selector: 'templateId'
            }),
            __metadata("design:paramtypes", [Object])
        ], TemplateIdDirective);
        return TemplateIdDirective;
    }());
    exports.TemplateIdDirective = TemplateIdDirective;
});
define("app.module", ["require", "exports", "decorators/module.decorator", "app.component", "components/toolbox-view/toolbox-view.module", "services/http-request.service", "directives/template-id.directive"], function (require, exports, module_decorator_3, app_component_1, toolbox_view_module_1, http_request_service_1, template_id_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppModule = /** @class */ (function () {
        function AppModule() {
        }
        AppModule = __decorate([
            module_decorator_3.NgModule({
                declarations: [
                    app_component_1.AppComponent,
                    template_id_directive_1.TemplateIdDirective
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
});
/// <reference types="angular" />
define("main", ["require", "exports", "app.module"], function (require, exports, app_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new app_module_1.AppModule();
});
define("services/ng-services.service", ["require", "exports", "decorators/injectable.decorator"], function (require, exports, injectable_decorator_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NgServices = /** @class */ (function () {
        function NgServices($compile, $injector) {
            this.$compile = $compile;
            this.$injector = $injector;
        }
        NgServices.prototype.getCompileService = function () {
            return this.$compile;
        };
        NgServices.prototype.getInjectorService = function () {
            return this.$injector;
        };
        NgServices = __decorate([
            injectable_decorator_4.Injectable(),
            __metadata("design:paramtypes", [Object, Object])
        ], NgServices);
        return NgServices;
    }());
    exports.NgServices = NgServices;
});
