import React, { SVGAttributes } from 'react';
import { Meta, Story } from '@storybook/react';
import { Node } from '../src/components/node/Node';
import { INodeProps } from '../src/components/node/Node.types';
import { Args, BaseStory } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import * as d3 from 'd3';

const meta: Meta = {
  title: 'Node',
  component: Node,
};

export default meta;

interface ITemplateArgs extends BaseStory<Args, StoryFnReactReturnType> {
  nodeProps: INodeProps
}

const Template: Story<ITemplateArgs> = (args: ITemplateArgs) => (
  <div>
    <svg>
      <g transform="translate(100, 50)">
        <Node {...args.nodeProps} />
      </g>
    </svg>
  </div>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Basic: Story<ITemplateArgs> = Template.bind({});
Basic.args = {
  nodeProps: {
    id: "Fluent Graph",
    label: "Fluent Graph",
  }
};

export const Styled: Story<ITemplateArgs> = Template.bind({});
Styled.args = {
  nodeProps: {
    id: "Fluent Graph",
    size: 500,
    x: 50,
    y: 0,
    label: "Fluent Graph",
    nodeStyle: {
      fill: "none",
      stroke: "skyblue",
      strokeWidth: 2.5,
    },
    labelStyle: {
      fill: "gray",
      fontSize: 12,
      fontWeight: "bold",
    },
    labelOffset: 20,
  }
};

export const Events: Story<ITemplateArgs> = Template.bind({});
Events.args = {
  nodeProps: {
    id: "Fluent Graph",
    label: "Check console!",
    onClickNode: () => console.log('Node clicked!'),
    onMouseOverNode: () => console.log("Node mouse over"),
    onMouseOutNode: () => console.log("Node mouse out"),
  }
};

export const CustomizeNode: Story<ITemplateArgs> = Template.bind({});
CustomizeNode.args = {
  nodeProps: {
    id: "Fluent Graph",
    label: "Fluent Graph",
    size: 300,
    onRenderNode: (props: INodeProps) => {
      const path1Props: SVGAttributes<SVGElement> = {
        d: d3.symbol().type(d3.symbolCircle).size(props.size * 0.6)() ?? undefined,
        style: {
          ...props.nodeStyle,
          fill: "#d3d3d3"
        }
      };
      const path2Props: SVGAttributes<SVGElement> = {
        d: d3.symbol().type(d3.symbolCircle).size(props.size)() ?? undefined,
        style: {
          ...props.nodeStyle,
          fill: "none",
          stroke: "#d3d3d3"
        }
      };
      return (
        <g tabIndex={0}>
          <path {...path1Props} />
          <path {...path2Props} />
        </g>
      );
    }
  }
}

export const CustomizeLabel: Story<ITemplateArgs> = Template.bind({});
CustomizeLabel.args = {
  nodeProps: {
    id: "Fluent Graph",
    onRenderLabel: (props) => {
      return (
        <path
          transform={`translate(0, 30)`}
          d={d3.symbol().type(d3.symbolStar).size(props.size)()}
          style={{
            fill: "skyblue"
          }}
        />
      );
    }
  }
}