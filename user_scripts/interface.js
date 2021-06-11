var data = {
    'Game': [
        {
            title: "The Lens",
            slug: "TheLens"
        },
        {
            title: "GHP",
            slug: "ghp"
        },
    ]
};


var PortfolioItem = React.createClass({
    render: function () {
        return (
            <div className="col-sm-6 col-md-4">
                <div className="thumbnail">
                    <img src={"./images/" + this.props.slug + ".png"}/>
                    <div className="caption">
                        <h3>{this.props.title}<br/>
                        </h3>
                        <p><a href={"./launcher.html#" + this.props.slug} className="btn btn-success" role="button">Play</a> <a href={"./binaries/" + this.props.slug + ".gba"} className="btn btn-primary" role="button">Download</a></p>
                    </div>
                </div>
            </div>
        );
    }
});

var PortfolioGroup = React.createClass({
    getInitialState: function () {
        return ({active: true});
    },
    render: function () {
        if (this.state.active) {
            var items = this.props.data.map(function (item, i) {
                return (
                    [<PortfolioItem key={i} title={item.title} slug={item.slug}></PortfolioItem>]
                );
            }, this);
            return (
                <div className="row">
                    <h2>{this.props.title}</h2>
                    {items}
                </div>
            );
        } else {
            return null;
        }
    }
})

var PortfolioFilters = React.createClass({
    updateFilter: function (name, event) {
        var active = event.target.checked;
        this.props.onChange(name, active);
    },
    render: function () {
        var boxes = this.props.groups.map(function (group, i) {
            return (
                <label key={i} className="checkbox-inline"><input type="checkbox" ref={group} name={group}
                                                                  defaultChecked={true}
                                                                  onChange={this.updateFilter.bind(null, group)}></input>{group}
                </label>
            );
        }, this);
        return (
            <div className="text-center">
                <h4>Filters: </h4>
                {boxes}
            </div>
        );
    }
})

var Portfolio = React.createClass({
    handleUpdate: function (group, active) {
        if (this.props.data[group] != null) {
            this.refs[group].setState({active: active})
        }
    },
    render: function () {
        var groupNames = [];
        var groups = [];
        for (var group in this.props.data) {
            if (this.props.data.hasOwnProperty(group)) {
                groupNames.push(group);
                groups.push(<PortfolioGroup key={group} ref={group} title={group}
                                            data={this.props.data[group]}></PortfolioGroup>)
            }
        }
        return (
            <div className="container"><PortfolioFilters groups={groupNames}
                                                         onChange={this.handleUpdate}></PortfolioFilters>
                <div>
                    {groups}
                </div>
            </div>
        );
    }
});

React.render(
    <Portfolio data={data}/>, document.getElementById("content")
);
